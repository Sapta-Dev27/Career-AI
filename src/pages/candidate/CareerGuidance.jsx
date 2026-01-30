'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

/* ---------------- DATA ---------------- */

const suggestedPrompts = [
  'What skills should I learn for a career in AI/ML?',
  'How can I transition from frontend to full-stack development?',
  'What are the best certifications for cloud computing?',
  'Help me create a 6-month career development plan',
  'What salary should I expect as a senior developer?',
  'How do I prepare for a technical leadership role?',
]

const initialMessages = [
  {
    id: 1,
    role: 'assistant',
    content:
      "Hello! I'm your AI Career Coach. I'm here to help you navigate your career journey. How can I assist you today?",
    timestamp: new Date(),
  },
]

/* ---------------- COMPONENT ---------------- */

export default function CareerGuidance() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef(null)
  const scrollViewportRef = useRef(null)

  const [autoScroll, setAutoScroll] = useState(true)

  /* ---------- AUTO SCROLL LOGIC ---------- */

  const scrollToBottom = () => {
    if (!autoScroll) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleScroll = () => {
    const el = scrollViewportRef.current
    if (!el) return

    const isAtBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 50

    setAutoScroll(isAtBottom)
  }

  /* ---------- CHAT HANDLERS ---------- */

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userInput) => {
    return `Based on your question about "${userInput}", here’s a structured approach:\n\n1. **Skill Focus** – Identify the most in-demand skills.\n2. **Experience** – Build real-world projects.\n3. **Networking** – Engage with professionals in the field.\n4. **Planning** – Create a realistic growth roadmap.\n\nWant me to break this down further?`
  }

  const handleSuggestedPrompt = (prompt) => {
    setInput(prompt)
  }

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content)
    toast.success('Copied to clipboard')
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">

      {/* ---------------- CHAT COLUMN ---------------- */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Card className="flex h-full flex-col border-border">

          {/* HEADER */}
          <CardHeader className="border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Career Coach</CardTitle>
                <CardDescription>
                  Personalized guidance for your career journey
                </CardDescription>
              </div>
              <Badge variant="secondary" className="ml-auto">
                <Sparkles className="mr-1 h-3 w-3" /> AI Powered
              </Badge>
            </div>
          </CardHeader>

          {/* MESSAGES */}
          <ScrollArea
            className="flex-1 px-4 py-3 scrollbar-hide hover:scrollbar-default"
            viewportRef={scrollViewportRef}
            onScrollCapture={handleScroll}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex gap-3',
                    message.role === 'user'
                      ? 'flex-row-reverse'
                      : 'flex-row'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full',
                      message.role === 'user'
                        ? 'bg-primary'
                        : 'bg-muted'
                    )}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>

                  <div
                    className={cn(
                      'max-w-[80%] rounded-lg px-4 py-3 text-sm whitespace-pre-wrap',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.content}

                    {message.role === 'assistant' && (
                      <div className="mt-3 flex gap-2 border-t border-border/50 pt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopy(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Thinking…</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* INPUT */}
          <CardContent className="border-t border-border p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about career advice, skills, job search strategies..."
                className="min-h-[60px] flex-1 resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />
              <Button type="submit" disabled={!input.trim() || isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- SIDEBAR ---------------- */}
      <div className="w-full lg:w-80 h-full overflow-hidden">
        <ScrollArea className="h-full pr-2 scrollbar-hide hover:scrollbar-default">
          <div className="space-y-4">

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Suggested Questions
                </CardTitle>
                <CardDescription>Click to ask</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedPrompt(prompt)}
                    className="w-full rounded-md border p-3 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Your Profile Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Role</span>
                  <span className="font-medium">Software Engineer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium">5 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target Role</span>
                  <span className="font-medium">Tech Lead</span>
                </div>
              </CardContent>
            </Card>

          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
