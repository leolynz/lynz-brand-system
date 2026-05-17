'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function updateUserRole(userId: string, role: 'admin' | 'staff') {
  const supabase = createAdminClient()

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) throw new Error(error.message)

  revalidatePath('/settings')
}

export async function deleteUser(userId: string) {
  const supabase = createAdminClient()

  // Deleting from auth.users also deletes from public.profiles due to CASCADE
  const { error } = await supabase.auth.admin.deleteUser(userId)

  if (error) throw new Error(error.message)

  revalidatePath('/settings')
}
