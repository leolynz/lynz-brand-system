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
    // We detect Google Key by 'AIz' prefix
    if (apiKey.startsWith('AIz')) {
      console.log('Detected GOOGLE AI Key. Using Google Provider.');
      const google = createGoogleGenerativeAI({ apiKey });
      
      // Map common OpenRouter model IDs to Google IDs if necessary
      let finalModelId = 'gemini-1.5-flash';
      if (modelId) {
        if (modelId.includes('gemini-1.5-pro')) finalModelId = 'gemini-1.5-pro';
        else if (modelId.includes('gemini-1.5-flash')) finalModelId = 'gemini-1.5-flash';
      }
      
      modelInstance = google(finalModelId);
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

    const systemPrompt = `Você é o "Lynz Brand System Assistant", um estrategista de marca e assistente especialista proativo.
Sua missão é ajudar colaboradores e parceiros a encontrar ativos, entender diretrizes e, acima de tudo, PLANEJAR novas estratégias de marca com base nos documentos oficiais.

Você tem acesso às seguintes diretrizes extraídas de arquivos MDX:
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Instruções Cruciais:
1. Responda SEMPRE em Português do Brasil de forma inspiradora e profissional.
2. Se o usuário pedir para criar algo (ex: um post), aja como um consultor: sugira como aplicar o tom de voz e quais cores usar conforme os documentos.
3. Se a informação não existir, oriente o usuário a procurar o time de branding.
4. Use Markdown para formatar a resposta.`;

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
