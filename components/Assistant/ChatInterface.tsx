'use client'

import { useChat, type Message } from '@ai-sdk/react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Send, Sparkles, User, ArrowRight, Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SUGGESTED_PROMPTS = [
  "Onde encontro o logo da marca?",
  "Quais são as cores primárias?",
  "Resuma o manifesto da marca.",
  "Quais as regras da tipografia?",
]

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSuggestionClick = (prompt: string) => {
    append({
      role: 'user',
      content: prompt,
    })
  }

  const isInitialState = messages.length === 0

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden bg-neutral-50/50">
      {/* Header */}
      <header className="h-16 flex items-center px-8 border-b border-neutral-200 bg-white">
        <h1 className="text-sm font-medium text-neutral-900">Lynz Assistant</h1>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
        <div className="max-w-3xl mx-auto px-6 py-12">
          {isInitialState ? (
            <div className="flex flex-col items-center text-center mt-12 mb-16">
              <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
                Como posso ajudar hoje?
              </h2>
              <p className="text-neutral-500 max-w-md">
                Eu sou o assistente oficial do Lynz Brand System. Pergunte-me qualquer coisa sobre as diretrizes da marca.
              </p>

              {/* Suggestions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl mt-12">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSuggestionClick(prompt)}
                    className="flex items-center justify-between text-left p-4 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50 transition-all group"
                  >
                    <span className="text-sm text-neutral-700">{prompt}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex gap-4 max-w-3xl",
                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1",
                    m.role === 'user' ? "bg-neutral-200" : "bg-neutral-900"
                  )}>
                    {m.role === 'user' ? (
                      <User className="w-4 h-4 text-neutral-600" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className={cn(
                    "flex flex-col gap-2 max-w-[85%]",
                    m.role === 'user' ? "items-end" : "items-start"
                  )}>
                    <div className={cn(
                      "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                      m.role === 'user' 
                        ? "bg-neutral-900 text-white" 
                        : "bg-white border border-neutral-200 text-neutral-800 shadow-sm"
                    )}>
                      {m.role === 'user' ? (
                        m.content
                      ) : (
                        <div className="prose prose-sm prose-neutral max-w-none prose-p:leading-relaxed prose-pre:bg-neutral-900 prose-pre:text-white">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="bg-white border border-neutral-200 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-neutral-400 animate-spin" />
                    <span className="text-sm text-neutral-400">Pensando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-neutral-50 via-neutral-50 to-transparent pt-12 pb-8">
        <div className="max-w-3xl mx-auto px-6">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center"
          >
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Pergunte sobre as diretrizes da marca..."
              className="w-full bg-white border border-neutral-200 rounded-2xl px-6 py-4 pr-16 shadow-lg focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-all text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 p-2 bg-neutral-900 text-white rounded-xl disabled:bg-neutral-200 disabled:text-neutral-400 transition-all hover:bg-neutral-800"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
          <p className="text-[10px] text-neutral-400 text-center mt-3">
            O assistente pode cometer erros. Considere verificar as informações importantes nos documentos oficiais.
          </p>
        </div>
      </div>
    </main>
  )
}
