import { AuthHeader } from '@/components/auth/AuthHeader'
import { GradientPanel } from '@/components/auth/GradientPanel'
import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <>
      <AuthHeader />

      {/* Main content below the fixed header (56px = h-14) */}
      <div
        className="flex"
        style={{ height: 'calc(100vh - 56px)', marginTop: '56px' }}
      >
        {/* Left panel — login form */}
        <div className="flex items-center justify-center bg-white px-12 w-2/5 shrink-0">
          <LoginForm />
        </div>

        {/* Right panel — animated gradient */}
        <div className="flex-1">
          <GradientPanel />
        </div>
      </div>
    </>
  )
}
