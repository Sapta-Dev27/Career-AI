import { Outlet, Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen  text-white overflow-hidden">

      {/* LEFT SECTION */}
      <div className="relative hidden lg:flex flex-1 items-center">

        {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f33] via-black to-[#0a3a3a]" />

        {/* GLASS OVERLAY PANEL (THIS IS THE KEY FIX) */}
        <div
          className="relative z-10 ml-12
          backdrop-blur-2xl 
          px-10 py-12 space-y-8 shadow-xl"
        >
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold">CareerAI</span>
          </Link>

          {/* TEXT */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight">
              Your AI-powered career <br /> companion awaits
            </h1>

            <p className="text-white/70 text-lg">
              Get personalized career guidance, build stunning resumes,
              and ace your interviews with the power of AI.
            </p>
          </div>

          {/* SOCIAL PROOF */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((c) => (
                <div
                  key={c}
                  className="flex h-8 w-8 items-center justify-center rounded-full
                  bg-black/30 border border-white/30 text-xs"
                >
                  {c}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70">
              <span className="font-semibold text-white">10,000+</span> professionals already using CareerAI
            </p>
          </div>

          {/* FOOTER LINKS */}
          <div className="flex gap-6 text-sm text-white/60 pt-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact</span>
          </div>
        </div>
      </div>

      {/* RIGHT LOGIN SECTION (NO GLASS) */}
      <div className="flex flex-1 items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
