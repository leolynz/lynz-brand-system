import { createClient } from '@/lib/supabase/server'
import { UserList } from './UserList'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/docs/fundamentos/nucleo-da-marca')
  }

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900">Configurações</h1>
          <p className="text-neutral-500 mt-2">
            Gerencie os membros da equipe e suas permissões.
          </p>
        </header>

        <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/50">
            <h2 className="text-sm font-semibold text-neutral-900">Membros da Equipe</h2>
          </div>
          <UserList users={users || []} currentUserId={user.id} />
        </section>
      </div>
    </div>
  )
}
