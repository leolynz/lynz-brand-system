import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getBrandContext } from '@/lib/ai/context';
import { createClient } from '@/lib/supabase/server';
import { getSupabaseConfig } from '@/lib/supabase/config';

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

    // Safe debugging: Log only the keys, never the values!
    const availableKeys = Object.keys(process.env).filter(k => 
      k.includes('OPENROUTER') || k.includes('SUPABASE')
    );
    console.log('Server-side check - Available keys:', availableKeys);
    console.log('Brand Context size:', brandContext?.length || 0);
    
    let apiKey = process.env.OPENROUTER_API_KEY;
    
    if (!apiKey) {
      console.error('Missing OPENROUTER_API_KEY');
      return new Response(JSON.stringify({ error: '[ENV_CONFIG] Chave OPENROUTER_API_KEY não encontrada' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sanitize API Key: remove spaces, quotes, and 'Bearer ' prefix if accidentally included
    apiKey = apiKey.trim().replace(/^Bearer\s+/i, '').replace(/^["']|["']$/g, '');
    
    // SAFE LOG: Check only parts of the key for verification
    console.log('API Key Verification:');
    console.log('- Length:', apiKey.length);
    console.log('- Starts with:', apiKey.substring(0, 7));
    console.log('- Ends with:', apiKey.substring(apiKey.length - 4));
    console.log('- Raw starts with sk-or:', apiKey.startsWith('sk-or'));

    // 2. Initialize Provider inside the handler to ensure env vars are fresh
    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      headers: {
        'HTTP-Referer': 'https://lynz-brand-system.vercel.app',
        'X-Title': 'Lynz Brand System',
      }
    });

    const systemPrompt = `Você é o "Lynz Brand System Assistant", um assistente especialista e proativo do sistema de marca da Lynz.
Sua missão é ajudar colaboradores e parceiros a encontrar ativos, entender diretrizes e planejar novas estratégias de marca com base nos documentos oficiais.

Você tem acesso direto ao conteúdo dos seguintes documentos (em formato MDX):
- Fundamentos: 00-definicao.mdx, golden-circle.mdx, posicionamento.mdx, nucleo-da-marca.mdx
- Identidade Verbal: manifesto.mdx, tom-de-voz.mdx
- Identidade Visual: cores.mdx, tipografia.mdx
- Aplicações: digital.mdx

Aqui está o conteúdo consolidado desses documentos para sua referência:
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Instruções de Comportamento:
1. Responda SEMPRE em Português do Brasil.
2. Use as informações acima para embasar suas respostas. Se uma informação não estiver nos documentos, diga honestamente que não tem esse dado específico e sugira consultar o time de branding.
3. Além de informar, ajude o usuário a PLANEJAR estratégias. Se ele perguntar sobre um post de Instagram, sugira como usar o Tom de Voz (de tom-de-voz.mdx) e as Cores (de cores.mdx).
4. Mantenha um tom profissional, inspirador e alinhado com a personalidade da marca Lynz.
5. Quando mencionar uma seção, você pode indicar o nome do arquivo (ex: "conforme detalhado em manifesto.mdx").`;

    const modelId = process.env.OPENROUTER_MODEL || 'google/gemma-7b-it:free';
    console.log('Attempting AI stream with model:', modelId);

    const result = await streamText({
      model: openrouter(modelId) as any,
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error('FULL AI ROUTE ERROR:', error);
    
    // Check for specific OpenRouter error patterns
    const errorMessage = error.message || '';
    const errorStatus = error.status || 500;
    
    return new Response(JSON.stringify({ 
      error: `[PROVIDER_ERROR] ${errorMessage}`,
      status: errorStatus,
      hint: 'Verifique se sua chave do OpenRouter tem créditos e se o modelo selecionado está disponível.'
    }), { 
      status: errorStatus,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
