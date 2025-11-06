import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Trash2, Minimize2, MoreVertical, Edit, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
interface Message {
  role: 'user' | 'assistant';
  content: string;
  image?: string;
  imageId?: string;
  imageCreatedAt?: number;
  isRemoving?: boolean;
}
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    language
  } = useLanguage();
  useEffect(() => {
    const saved = localStorage.getItem('chatbot-messages');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }
  }, []);
  useEffect(() => {
    if (messages.length > 0) {
      try {
        // Don't store images in localStorage - only text messages
        const messagesWithoutImages = messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }));
        localStorage.setItem('chatbot-messages', JSON.stringify(messagesWithoutImages));
      } catch (error) {
        if (error instanceof Error && error.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded, clearing old messages');
          // Clear chat history when quota exceeded
          localStorage.removeItem('chatbot-messages');
          toast.error('Chat history cleared due to storage limit');
        }
      }
    }
  }, [messages]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  const streamChat = async (userMessage: string) => {
    const newMessages = [...messages, {
      role: 'user' as const,
      content: userMessage
    }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/school-chat`;
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          messages: newMessages,
          language
        })
      });
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const contentType = resp.headers.get('content-type');

      // Check if response contains image
      if (contentType?.includes('application/json')) {
        const data = await resp.json();
        if (data.hasImage && data.image) {
          const imageId = crypto.randomUUID();
          setMessages([...newMessages, {
            role: 'assistant',
            content: data.content,
            image: data.image,
            imageId,
            imageCreatedAt: Date.now()
          }]);
          setIsLoading(false);
          return;
        }
      }

      // Regular streaming response
      if (!resp.body) throw new Error('No response body');
      let assistantContent = '';
      const upsertAssistant = (chunk: string) => {
        assistantContent += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => i === prev.length - 1 ? {
              ...m,
              content: assistantContent
            } : m);
          }
          return [...prev, {
            role: 'assistant',
            content: assistantContent
          }];
        });
      };
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let streamDone = false;
      while (!streamDone) {
        const {
          done,
          value
        } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, {
          stream: true
        });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split('\n')) {
          if (!raw) continue;
          if (raw.endsWith('\r')) raw = raw.slice(0, -1);
          if (raw.startsWith(':') || raw.trim() === '') continue;
          if (!raw.startsWith('data: ')) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {}
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Chat error:', error);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    }
  };
  const handleDownloadImage = async (imageUrl: string) => {
    try {
      // Convert base64 to blob for better download handling
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `school-diagram-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download image');
    }
  };
  const handleDeleteImage = (imageId: string) => {
    setMessages(prevMessages => prevMessages.map(msg => msg.imageId === imageId ? {
      ...msg,
      image: undefined,
      imageId: undefined,
      imageCreatedAt: undefined
    } : msg));
    toast.success('Image removed');
  };
  const handleEditChart = (imageId: string) => {
    const message = messages.find(msg => msg.imageId === imageId);
    if (!message) return;
    const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
    if (message.imageCreatedAt && message.imageCreatedAt < twoMinutesAgo) {
      toast.error('Chart can no longer be edited (2 minute limit exceeded)');
      return;
    }
    setInput(`Edit the chart: `);
    toast.info('Type your edit instructions');
  };
  const isEditDisabled = (imageCreatedAt?: number) => {
    if (!imageCreatedAt) return true;
    const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
    return imageCreatedAt < twoMinutesAgo;
  };
  const handleDeleteMessage = (index: number) => {
    setMessages(prev => prev.map((m, i) => i === index ? {
      ...m,
      isRemoving: true
    } : m));
    setTimeout(() => {
      setMessages(prev => prev.filter((_, i) => i !== index));
    }, 300);
  };
  const handleEditMessage = (index: number) => {
    const msg = messages[index];
    if (!msg) return;
    setInput(msg.content);
    toast.info('Edit the message and press Send');
  };
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    await streamChat(userMessage);
  };
  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('chatbot-messages');
  };
  if (!isOpen) {
    return <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-200" aria-label="Open AI School Assistant">
        <MessageCircle className="h-6 w-6" />
      </button>;
  }
  return <div className={cn("fixed bottom-6 right-6 z-50 bg-background border border-border rounded-lg shadow-2xl transition-all duration-300", isMinimized ? "w-80 h-14" : "w-96 h-[600px]")}>
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Ask Our AI School Assistant
        </h3>
        <div className="flex gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-primary-foreground/10 p-1 rounded transition-colors" aria-label={isMinimized ? "Maximize" : "Minimize"}>
            <Minimize2 className="h-4 w-4" />
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:bg-primary-foreground/10 p-1 rounded transition-colors" aria-label="Close chat">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {!isMinimized && <>
          <ScrollArea className="h-[440px] p-4" ref={scrollRef}>
            {messages.length === 0 && <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Hello! I'm your AI School Assistant.</p>
                <p className="text-xs mt-1">Ask me anything about school or academics!</p>
              </div>}
            {messages.map((msg, idx) => <div key={idx} className={cn("mb-4 p-3 rounded-lg relative transition-all", msg.isRemoving ? "animate-fade-out" : "animate-fade-in", msg.role === 'user' ? "bg-primary text-primary-foreground ml-auto max-w-[85%]" : "bg-muted text-foreground max-w-full")}>
                <div className="absolute top-2 right-2 bg-slate-50">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-6 w-6 p-0 text-foreground/70 hover:text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background z-50">
                      <DropdownMenuItem onClick={() => handleEditMessage(idx)} className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteMessage(idx)} className="gap-2 text-destructive focus:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                
                {msg.image && msg.imageId && <div className="mt-3 space-y-2 animate-fade-in">
                    <div className="relative group">
                      <img src={msg.image} alt="AI Generated Diagram" className="rounded-lg border border-border max-w-full h-auto shadow-sm" />
                      <div className="absolute top-2 right-2 flex gap-2">
                        <Button size="sm" onClick={() => handleDownloadImage(msg.image!)} className="h-8 gap-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 shadow-lg hover:shadow-accent/50 backdrop-blur-sm font-medium animate-pulse hover:animate-none transition-all text-blue-700">
                          <Download className="h-3.5 w-3.5" />
                          <span className="text-xs text-red-600">Download</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-background/90 backdrop-blur-sm hover:bg-background shadow-sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background">
                            <DropdownMenuItem onClick={() => handleEditChart(msg.imageId!)} disabled={isEditDisabled(msg.imageCreatedAt)} className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit Chart
                              {isEditDisabled(msg.imageCreatedAt) && <span className="text-xs text-muted-foreground ml-auto">(Expired)</span>}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteImage(msg.imageId!)} className="gap-2 text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4" />
                              Delete Image
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>}
              </div>)}
            {isLoading && <div className="mb-4 p-3 rounded-lg max-w-[85%] bg-muted">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{
              animationDelay: '0ms'
            }} />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{
              animationDelay: '150ms'
            }} />
                  <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{
              animationDelay: '300ms'
            }} />
                </div>
              </div>}
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2 mb-2">
              <Input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder="Type your question..." disabled={isLoading} className="flex-1" />
              <Button onClick={handleSend} disabled={isLoading || !input.trim()} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <button onClick={handleClear} className="flex items-center gap-1 hover:text-foreground transition-colors" disabled={messages.length === 0}>
                <Trash2 className="h-3 w-3" />
                Clear chat
              </button>
              <span className="opacity-70">Powered by AI</span>
            </div>
          </div>
        </>}
    </div>;
};
export default ChatBot;