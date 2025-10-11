import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'en' } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Check if the last message contains visual keywords
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
    const visualKeywords = ['draw', 'show', 'illustrate', 'diagram', 'structure', 'picture', 'sketch', 'graph', 'chart', 'visualize', 'depict', 'image of'];
    const needsVisualization = visualKeywords.some(keyword => lastMessage.includes(keyword));

    if (needsVisualization) {
      // Generate image using Lovable AI
      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [
            {
              role: "user",
              content: `Create a clear, educational ${language === 'en' ? 'English' : language === 'fr' ? 'French' : language === 'es' ? 'Spanish' : language === 'ar' ? 'Arabic' : language === 'zh' ? 'Chinese' : language === 'sw' ? 'Kiswahili' : 'English'} labeled diagram or illustration for: ${lastMessage}. Make it suitable for academic learning with clear labels and professional quality.`
            }
          ],
          modalities: ["image", "text"]
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        const textExplanation = imageData.choices?.[0]?.message?.content || '';

        if (imageUrl) {
          // Return both text explanation and image
          return new Response(JSON.stringify({ 
            content: textExplanation || 'Here is the visualization you requested:',
            image: imageUrl,
            hasImage: true
          }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
      }
    }

    // Regular text-based response
    const systemPrompt = `You are an AI School Support & Academic Assistant for an international school. You help students, parents, and visitors with:

1. General school questions: admissions, fees, uniforms, class schedules, events, contact information
2. Academic tutoring across all subjects: Mathematics, English, Science (Biology, Physics, Chemistry), History, Geography, ICT, Kiswahili, Art, Commerce, CRE, IRE, Agriculture, and more
3. Administrative guidance: how to apply, academic levels, school policies

Guidelines:
- Be friendly, accurate, and educational
- For academic questions, provide clear explanations with examples
- For school-specific questions, give helpful guidance (admissions process, contact info, etc.)
- Keep responses concise but informative
- Always maintain a professional yet warm tone
- If asked about solving problems (math, science), show step-by-step solutions
- Respond in ${language === 'en' ? 'English' : language === 'fr' ? 'French' : language === 'es' ? 'Spanish' : language === 'ar' ? 'Arabic' : language === 'zh' ? 'Chinese' : language === 'sw' ? 'Kiswahili' : 'English'}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
