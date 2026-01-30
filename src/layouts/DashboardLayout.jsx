'use client';

import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Mail,
  Mic,
  Lightbulb,
  Briefcase,
  Users,
  PlusCircle,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
  Sparkles,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const candidateNavItems = [
  { name: 'Dashboard', href: '/candidate', icon: LayoutDashboard },
  { name: 'Career Guidance', href: '/candidate/career-guidance', icon: MessageSquare },
  { name: 'Resume Builder', href: '/candidate/resume-builder', icon: FileText },
  { name: 'Cover Letter', href: '/candidate/cover-letter', icon: Mail },
  { name: 'Interview Prep', href: '/candidate/interview-prep', icon: Mic },
  { name: 'Recommendations', href: '/candidate/recommendations', icon: Lightbulb },
  { name: 'Job Listings', href: '/candidate/jobs', icon: Briefcase },
]

const recruiterNavItems = [
  { name: 'Dashboard', href: '/recruiter', icon: LayoutDashboard },
  { name: 'Post Job', href: '/recruiter/post-job', icon: PlusCircle },
  { name: 'Manage Jobs', href: '/recruiter', icon: Briefcase },
  { name: 'Applicants', href: '/recruiter/applicants/all', icon: Users },
]

export default function DashboardLayout({ userType = 'candidate' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const navItems = userType === 'candidate' ? candidateNavItems : recruiterNavItems
  const userName = userType === 'candidate' ? 'Alex Johnson' : 'Hiring Manager'
  const userEmail = userType === 'candidate' ? 'alex@example.com' : 'hr@company.com'

  const isActiveLink = (href) => {
    if (href === '/candidate' || href === '/recruiter') {
      return location.pathname === href
    }
    return location.pathname.startsWith(href)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 ease-in-out lg:static lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-sidebar-foreground">CareerAI</span>
          </Link>
          <button
            type="button"
            className="rounded-md p-1 text-sidebar-foreground lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = isActiveLink(item.href)
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
              <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
              <p className="truncate text-xs text-sidebar-foreground/70">{userEmail}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-foreground lg:text-xl">
              {navItems.find(item => isActiveLink(item.href))?.name || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={userName} />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="hidden h-4 w-4 sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex cursor-pointer items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="flex cursor-pointer items-center text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
