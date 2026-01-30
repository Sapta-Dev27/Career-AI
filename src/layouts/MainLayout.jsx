'use client';

import { Outlet, Link } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <Link to="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link to="/#how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              How It Works
            </Link>
            <Link to="/#pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-4 py-4">
              <Link
                to="/#features"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                to="/#how-it-works"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/#pricing"
                className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild className="w-full bg-transparent">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">CareerAI</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Your AI-powered career companion for smarter job searching and professional growth.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link to="/#pricing" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              2026 CareerAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
