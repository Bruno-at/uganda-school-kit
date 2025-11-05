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
              content: `You are an expert educational illustrator. Create a highly accurate, professionally labeled diagram for: "${lastMessage}"

CRITICAL REQUIREMENTS:
1. ACCURATE LABELING: Every part must be correctly labeled with its actual scientific/anatomical name
   - Eye → labeled as "Eye" (not random text)
   - Wing → labeled as "Wing" (not misplaced)
   - Each component must match real-world structure exactly

2. DIAGRAM QUALITY:
   - Use clear, bold labels with leader lines pointing to exact features
   - Labels in ${language === 'en' ? 'English' : language === 'fr' ? 'French' : language === 'es' ? 'Spanish' : language === 'ar' ? 'Arabic' : language === 'zh' ? 'Chinese' : language === 'sw' ? 'Kiswahili' : 'English'}
   - Professional educational textbook style
   - Clean white or light background
   - High contrast for visibility

3. INTELLIGENT CONTEXT UNDERSTANDING:
   - For biological subjects (animals, plants, cells): Include all major anatomical features
   - For physics/engineering (X-ray tubes, circuits): Show all functional components with technical labels
   - For geography/maps: Accurate geographical features and locations
   - For chemistry: Proper molecular structures and apparatus labels

4. LAYOUT:
   - Main subject centered and clearly visible
   - Labels positioned around the subject without overlapping
   - Use arrows or lines connecting labels to features
   - Include a simple title at the top

Generate a scientifically accurate, educational-quality labeled diagram now.`
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
    const systemPrompt = `You are an AI School Support & Academic Assistant for Excellence Academy, located in Kampala, Uganda. You help students, parents, and visitors with comprehensive information about the school and provide academic tutoring.

SCHOOL INFORMATION:

**Contact Information:**
- Physical Address: Excellence Academy, Plot 123, Kyanja Road, Kampala, Uganda
- Main Office: +256 700 123 456
- Admissions: +256 700 123 457
- Emergency: +256 700 123 458
- Email: info@excellenceacademy.ug, admissions@excellenceacademy.ug
- Office Hours: Monday-Friday: 7:30 AM - 5:00 PM, Saturday: 8:00 AM - 1:00 PM, Sunday: Closed

**Leadership:**
- Head Teacher: Dr. Margaret Ssemakula (PhD Education Leadership, M.Ed Curriculum Studies, 20+ years experience)
- Deputy Head - Academics: Mr. John Kiprotich (M.Sc Mathematics, B.Ed Secondary)
- Head of Sciences: Ms. Grace Namubiru (M.Sc Chemistry, B.Ed Science)
- Director of Student Affairs: Mr. David Ochaya (M.A Counseling Psychology)

**Mission:** To provide holistic education that nurtures character, academic excellence, and innovation, preparing students to become responsible global citizens and future leaders.

**Vision:** To be Uganda's leading educational institution, recognized for academic excellence, character development, and producing graduates who make positive impacts in society.

**Core Values:** Integrity & Honesty, Excellence & Achievement, Respect & Diversity, Innovation & Creativity, Community & Service

**Academic Programs:**
- O-Level (S.1 - S.4): Secondary Education Foundation
- A-Level (S.5 - S.6): Advanced Secondary Education
- Subjects: Mathematics, English, Science (Biology, Physics, Chemistry), History, Geography, ICT, Kiswahili, Art, Commerce, CRE, IRE, Agriculture, and more

**Admission Requirements:**

O-Level:
- Completed Primary 7 with PLE certificate
- Birth certificate or equivalent proof of age
- Medical certificate from approved health center
- Transfer letter from previous school (if applicable)
- Recent passport-size photographs (4 copies)
- Registration fee: UGX 50,000

A-Level:
- Completed O-Level with UCE certificate
- Minimum of 5 passes including English and Mathematics
- Subject combinations aligned with desired A-Level track
- Medical certificate from approved health center
- Character reference from previous school
- Registration fee: UGX 75,000

**Fee Structure (Per Term):**

O-Level (S.1 - S.4):
- Day School Tuition: UGX 1,800,000
- Boarding (Full): UGX 2,200,000
- Lunch Program: UGX 400,000

A-Level (S.5 - S.6):
- Day School Tuition: UGX 2,100,000
- Boarding (Full): UGX 2,500,000
- Lunch Program: UGX 450,000

**Payment Methods:**
- Mobile Money (MTN, Airtel): Free for amounts below UGX 500,000
- Bank Transfer: Stanbic Bank, Centenary Bank, DFCU Bank
- Cash Payment: School Finance Office
- Cheque Payment: Any recognized bank

**Scholarships Available:**
- Academic Excellence: 50% tuition waiver for top 5% performers
- Financial Hardship: Up to 70% fee reduction with income verification
- Sibling Discount: 10% discount per additional child
- Staff Children: 25% tuition waiver for permanent staff

**Facilities:**
- Modern classrooms with smart boards
- Well-equipped science laboratories
- Computer lab with internet access
- Library with extensive book collection
- Sports facilities (football, basketball, netball)
- Boarding facilities (boys and girls)
- Cafeteria with nutritious meals

**Co-Curricular Activities:**
- Sports: Football, Basketball, Netball, Athletics
- Clubs: Debate, Drama, Music, Science Club, Computer Club
- Academic Competitions: Math Olympiad, Science Fair
- Community Service Programs

ACADEMIC TUTORING:
You also provide expert academic tutoring across all subjects. When students ask academic questions:
- Provide clear, step-by-step explanations
- Use examples relevant to the Ugandan curriculum
- Show problem-solving methods for math and science
- Explain concepts in a way that's easy to understand
- Encourage critical thinking and learning

Guidelines:
- Be friendly, accurate, and helpful like a receptionist
- For school questions, provide specific information from the details above
- For academic questions, act as a tutor and provide clear educational support
- Keep responses concise but informative
- Always maintain a professional yet warm tone
- If you don't have specific information, suggest contacting the school directly
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
