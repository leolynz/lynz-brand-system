import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AssetsPage() {
  redirect('/assets/logotipos')
}
