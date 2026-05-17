import { notFound } from 'next/navigation'
import { getAllDocs, getDocBySlug } from '@/lib/mdx'
import { buildNavigation } from '@/lib/navigation'
import { AppLayout } from '@/components/Layout/AppLayout'
import { ContentArea } from '@/components/ContentArea/ContentArea'
import { MdxRenderer } from '@/components/MdxRenderer/MdxRenderer'

interface PageProps {
  params: {
    slug: string
  }
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps) {
  try {
    const { meta } = await getDocBySlug(params.slug)
    return {
      title: `${meta.title} — Lynz Brand System`,
      description: meta.description,
    }
  } catch {
    return { title: 'Lynz Brand System' }
  }
}

export default async function DocPage({ params }: PageProps) {
  let doc
  try {
    doc = await getDocBySlug(params.slug)
  } catch {
    notFound()
  }

  const navigation = await buildNavigation()

  return (
    <AppLayout navigation={navigation} currentSlug={params.slug}>
      <ContentArea
        title={doc.meta.title}
        description={doc.meta.description}
        category={doc.meta.category}
      >
        <MdxRenderer source={doc.source} />
      </ContentArea>
    </AppLayout>
  )
}
