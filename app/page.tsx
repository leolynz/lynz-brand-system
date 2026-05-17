import { buildNavigation } from '@/lib/navigation'
import { AppLayout } from '@/components/Layout/AppLayout'
import ChatInterface from '@/components/Assistant/ChatInterface'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const navigation = await buildNavigation()

  return (
    <AppLayout navigation={navigation}>
      <ChatInterface />
    </AppLayout>
  )
}
