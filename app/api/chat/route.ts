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
    
    // 2. Validate Key Format (OpenRouter keys must start with sk-or-v1-)
    if (!apiKey.startsWith('sk-or-')) {
      const actualPrefix = apiKey.substring(0, 3);
      console.error(`INVALID KEY FORMAT: Key starts with "${actualPrefix}" instead of "sk-or-"`);
      return new Response(JSON.stringify({ 
        error: '[LOCAL_CONFIG] Chave de API Inválida',
        details: `A chave que o servidor recebeu começa com "${actualPrefix}". Chaves do OpenRouter DEVEM começar com "sk-or-v1-".`,
        hint: 'Se você já atualizou na Vercel, lembre-se de clicar em REDEPLOY no painel de Deployments para as mudanças valerem.'
      }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    console.log('API Key check passed - Prefix:', apiKey.substring(0, 10));

    // 3. Initialize Provider inside the handler to ensure env vars are fresh
    const openrouter = createOpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey,
      headers: {
        'HTTP-Referer': 'https://lynz-brand-system.vercel.app',
        'X-Title': 'Lynz Brand System',
      }
    });

    const systemPrompt = `Você é o "Lynz Brand System Assistant", um estrategista de marca e assistente especialista proativo.
Sua missão é ajudar colaboradores e parceiros a encontrar ativos, entender diretrizes e, acima de tudo, PLANEJAR novas estratégias de marca (posts, campanhas, eventos) com base nos documentos oficiais.

Você tem acesso direto ao conteúdo dos seguintes documentos (em formato MDX):
- Fundamentos: 00-definicao.mdx, golden-circle.mdx, posicionamento.mdx, nucleo-da-marca.mdx
- Identidade Verbal: manifesto.mdx, tom-de-voz.mdx
- Identidade Visual: cores.mdx, tipografia.mdx
- Aplicações: digital.mdx

Aqui está o conteúdo consolidado para sua referência:
---
${brandContext || 'Nenhuma diretriz carregada.'}
---

Instruções Cruciais:
1. Responda SEMPRE em Português do Brasil de forma inspiradora e profissional.
2. Se o usuário pedir para criar algo (ex: um post), aja como um consultor: sugira como aplicar o tom de voz e quais cores usar conforme os documentos.
3. Se a informação não existir, oriente o usuário a procurar o time de branding.
4. Seja conciso mas completo. Use Markdown para formatar listas e negritos.`;

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
