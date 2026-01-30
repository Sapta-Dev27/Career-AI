'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Welcome back!')
      navigate('/candidate')
    }, 1500)
  }

  return (
    <div className="rounded-2xl bg-[#0b0f14] border border-white/10 px-10 py-10 space-y-6 shadow-xl">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
        <p className="text-sm text-white/60">
          Sign in to your account to continue
        </p>
      </div>

      {/* SOCIAL */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
          Google
        </Button>
        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
          LinkedIn
        </Button>
      </div>

      <div className="relative">
        <Separator className="bg-white/10" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-[#0b0f14] px-2 text-xs text-white/40">
          OR CONTINUE WITH
        </span>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <Label className="text-white/80">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input className="pl-10 bg-black border-white/10 text-white" />
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <Label className="text-white/80">Password</Label>
            <Link to="/forgot-password" className="text-sm text-blue-400">
              Forgot password?
            </Link>
          </div>

          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              type={showPassword ? 'text' : 'password'}
              className="pl-10 pr-10 bg-black border-white/10 text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/60">
          <Checkbox /> Remember me for 30 days
        </div>

        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign in →'
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-white/60">
        Don’t have an account? <Link to="/register" className="text-blue-400">Sign up</Link>
      </p>

      <p className="text-center text-sm text-blue-400 cursor-pointer">
        Register as a Recruiter
      </p>
    </div>
  )
}
