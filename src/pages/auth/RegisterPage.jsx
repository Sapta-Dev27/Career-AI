'use client'

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Briefcase, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState('candidate')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success('Account created successfully!')
      navigate(role === 'candidate' ? '/candidate' : '/recruiter')
    }, 1500)
  }

  return (
    <div className="rounded-2xl bg-[#0b0f14] border border-white/10 px-10 py-10 space-y-6 shadow-xl">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold text-white">Create an account</h1>
        <p className="text-sm text-white/60">
          Choose your account type to get started
        </p>
      </div>

      {/* ROLE TOGGLE */}
      <div className="flex rounded-lg bg-black border border-white/10 p-1">
        <button
          type="button"
          onClick={() => setRole('candidate')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-sm transition',
            role === 'candidate'
              ? 'bg-[#161b22] text-white'
              : 'text-white/60 hover:text-white'
          )}
        >
          <User size={16} /> Candidate
        </button>
        <button
          type="button"
          onClick={() => setRole('recruiter')}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-sm transition',
            role === 'recruiter'
              ? 'bg-[#161b22] text-white'
              : 'text-white/60 hover:text-white'
          )}
        >
          <Briefcase size={16} /> Recruiter
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <div>
          <Label className="text-white/80">Full Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder={role === 'candidate' ? 'John Doe' : 'Jane Smith'}
              className="pl-10 bg-black border-white/10 text-white"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div>
          <Label className="text-white/80">
            {role === 'candidate' ? 'Email' : 'Work Email'}
          </Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder={
                role === 'candidate'
                  ? 'name@example.com'
                  : 'name@company.com'
              }
              className="pl-10 bg-black border-white/10 text-white"
            />
          </div>
        </div>

        {/* RECRUITER-ONLY FIELDS */}
        {role === 'recruiter' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-white/80">Company</Label>
              <Input
                placeholder="Acme Inc."
                className="bg-black border-white/10 text-white"
              />
            </div>
            <div>
              <Label className="text-white/80">Company Size</Label>
              <Input
                placeholder="1–50"
                className="bg-black border-white/10 text-white"
              />
            </div>
          </div>
        )}

        {/* PASSWORD */}
        <div>
          <Label className="text-white/80">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
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

    

        {/* TERMS */}
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Checkbox />
          I agree to the{' '}
          <span className="text-blue-400">Terms of Service</span> and{' '}
          <span className="text-blue-400">Privacy Policy</span>
        </div>

        {/* SUBMIT */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : role === 'candidate' ? (
            'Create account →'
          ) : (
            'Create recruiter account →'
          )}
        </Button>
      </form>

      {/* FOOTER */}
      <p className="text-center text-sm text-white/60">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
