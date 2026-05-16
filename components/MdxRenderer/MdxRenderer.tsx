import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Callout } from '@/components/mdx-components/Callout'
import { ColorSwatch } from '@/components/mdx-components/ColorSwatch'
import { DoAndDont } from '@/components/mdx-components/DoAndDont'
import { TokenTable } from '@/components/mdx-components/TokenTable'

const components = {
  Callout,
  ColorSwatch,
  DoAndDont,
  TokenTable,
}

interface MdxRendererProps {
  source: string
}

export function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose prose-neutral max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  )
}
