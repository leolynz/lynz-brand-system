import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. Check Authentication
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('Auth Check Failed: No user session found');
      return new Response(JSON.stringify({ error: '[LOCAL_AUTH] Sessão expirada ou não autorizado' }), { status: 401 });
    }

    const { messages } = await req.json();
    const brandContext = await getBrandContext();
    
    let apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error('Missing API Key');
      return new Response(JSON.stringify({ error: '[ENV_CONFIG] Chave de API não encontrada' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sanitize API Key
    apiKey = apiKey.trim().replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '');
    
    let modelInstance: any;
    let modelId = process.env.OPENROUTER_MODEL;

    // 2. Hybrid Logic: OpenRouter vs Google Gemini
    if (apiKey.startsWith('AIz')) {
      console.log('Detected GOOGLE AI Key. Using Google Provider.');
      const google = createGoogleGenerativeAI({ apiKey });
      
      // Use the most compatible ID. If this fails, the catch block will handle it.
      modelInstance = google('gemini-1.5-flash');
    } else {
      console.log('Detected OPENROUTER Key. Using OpenRouter Provider.');
      const openrouter = createOpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        headers: {
          'HTTP-Referer': 'https://lynz-brand-system.vercel.app',
          'X-Title': 'Lynz Brand System',
        }
      });
      modelInstance = openrouter(modelId || 'google/gemma-2-9b-it:free');
    }

    const systemPrompt = `Você é o "Lynz Brand System Assistant", o estrategista de marca oficial e assistente proativo da Lynz.

    SUA MISSÃO:
    Sua missão é ser o guardião da identidade Lynz. Você deve ajudar colaboradores a:
    1. Encontrar ativos (logos, cores, ícones).
    2. Entender diretrizes de tom de voz e aplicação visual.
    3. PLANEJAR estratégias: Se alguém pedir uma ideia de post, campanha ou e-mail, você DEVE sugerir como usar as diretrizes específicas (ex: "Use o tom de voz proativo de tom-de-voz.mdx e a cor primária de cores.mdx").

    CONTEÚDO DAS DIRETRIZES (RAG):
    ---
    ${brandContext || 'Nenhuma diretriz carregada.'}
    ---

    DIRETRIZES DE RESPOSTA:
    - Responda SEMPRE em Português do Brasil.
    - Seja inspirador, técnico e muito útil.
    - Se a informação não estiver nos documentos, oriente o contato com o time de branding.
    - Use Markdown para estruturar suas sugestões de forma profissional.`;


    const result = await streamText({
      model: modelInstance,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('FULL AI ROUTE ERROR:', error);
    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${error.message || 'Internal Server Error'}`,
      details: error.toString()
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
