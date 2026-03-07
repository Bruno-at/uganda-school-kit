import Header from './Header';
import Footer from './Footer';
import ChatBot from '@/components/chat/ChatBot';
import AutoTranslate from '@/components/AutoTranslate';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <AutoTranslate>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </AutoTranslate>
      <ChatBot />
    </div>
  );
}
