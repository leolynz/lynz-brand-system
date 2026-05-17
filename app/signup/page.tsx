import { AuthHeader } from '@/components/auth/AuthHeader'
import { GradientPanel } from '@/components/auth/GradientPanel'
import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <>
      <AuthHeader />

      {/* Main content below the fixed header (56px = h-14) */}
      <div
        className="flex"
        style={{ height: 'calc(100vh - 56px)', marginTop: '56px' }}
      >
        {/* Left panel — signup form */}
        <div className="flex items-center justify-center bg-white px-12 w-2/5 shrink-0">
          <SignupForm />
        </div>

        {/* Right panel — animated gradient */}
        <div className="flex-1">
          <GradientPanel />
        </div>
      </div>
    </>
  )
}
