import { AuthHeader } from '@/components/auth/AuthHeader'
import { GradientPanel } from '@/components/auth/GradientPanel'
import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthHeader />

      <div
        className="flex flex-1"
        style={{ height: 'calc(100vh - 56px)' }}
      >
        {/* Painel esquerdo — formulário */}
        <div className="flex w-[40%] items-center justify-center bg-white px-12 py-10">
          <SignupForm />
        </div>

        {/* Painel direito — gradiente animado */}
        <div className="w-[60%]">
          <GradientPanel />
        </div>
      </div>
    </div>
  )
}
