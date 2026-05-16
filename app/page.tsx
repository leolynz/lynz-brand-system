import Link from 'next/link'
import { buildNavigation } from '@/lib/navigation'
import { AppLayout } from '@/components/Layout/AppLayout'

export default async function HomePage() {
  const navigation = await buildNavigation()

  const sections = [
    {
      category: 'fundamentos',
      label: 'Fundamentos',
      description: 'Missão, visão, valores e o núcleo estratégico da marca.',
      slug: navigation.find((s) => s.category === 'fundamentos')?.items[0]?.slug,
    },
    {
      category: 'identidade-verbal',
      label: 'Identidade Verbal',
      description: 'Tom de voz, vocabulário, manifesto e naming.',
      slug: navigation.find((s) => s.category === 'identidade-verbal')?.items[0]?.slug,
    },
    {
      category: 'identidade-visual',
      label: 'Identidade Visual',
      description: 'Logo, cores, tipografia, grafismos e direção de imagem.',
      slug: navigation.find((s) => s.category === 'identidade-visual')?.items[0]?.slug,
    },
    {
      category: 'aplicacoes',
      label: 'Aplicações',
      description: 'Como a marca se aplica em digital, impresso e redes sociais.',
      slug: navigation.find((s) => s.category === 'aplicacoes')?.items[0]?.slug,
    },
  ]

  return (
    <AppLayout navigation={navigation}>
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="max-w-3xl mx-auto px-10 py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
            Bem-vindo
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-4">
            Lynz Brand System
          </h1>
          <p className="text-base text-neutral-500 leading-relaxed mb-12 max-w-xl">
            A fonte única de verdade para a identidade da Lynz. Explore as diretrizes de
            marca, identidade visual, verbal e aplicações.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((section) =>
              section.slug ? (
                <Link
                  key={section.category}
                  href={`/docs/${section.slug}`}
                  className="group flex flex-col gap-2 p-5 rounded-xl border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-150"
                >
                  <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                    {section.label}
                  </span>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {section.description}
                  </p>
                  <span className="text-xs text-neutral-400 group-hover:text-neutral-600 transition-colors mt-1">
                    Ver diretrizes →
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </main>
    </AppLayout>
  )
}
