'use client';

import { useState } from 'react'
import {
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  FileText,
  Building2,
  Briefcase,
  ClipboardList,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'

const toneOptions = [
  { value: 'professional', label: 'Professional' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'confident', label: 'Confident' },
  { value: 'formal', label: 'Formal' },
]

const sampleCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Software Engineer position at TechCorp. With over 5 years of experience in full-stack development and a proven track record of building scalable applications, I am confident that my skills and expertise align perfectly with your team's needs.

In my current role at StartupXYZ, I have successfully led the development of microservices architecture that serves over 1 million users daily. I have also mentored junior developers, implemented CI/CD pipelines that reduced deployment time by 75%, and consistently delivered high-quality code that meets business objectives.

What excites me most about this opportunity at TechCorp is your commitment to innovation and your focus on creating technology that makes a real difference. I am particularly drawn to your recent work in AI-powered solutions, and I would love the opportunity to contribute my expertise in React, Node.js, and cloud technologies to help drive these initiatives forward.

I am eager to bring my passion for clean code, collaborative problem-solving, and continuous learning to your team. I believe that my technical skills, combined with my experience in leading cross-functional teams, make me an ideal candidate for this role.

Thank you for considering my application. I would welcome the opportunity to discuss how my background and skills can contribute to TechCorp's continued success.

Sincerely,
Alex Johnson`

export default function CoverLetterGenerator() {
  const [formData, setFormData] = useState({
    jobTitle: 'Senior Software Engineer',
    companyName: 'TechCorp',
    jobDescription: 'We are looking for an experienced software engineer...',
    tone: 'professional',
    highlights: 'Led development of microservices...',
  })
  const [coverLetter, setCoverLetter] = useState(sampleCoverLetter)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = () => {
    if (!formData.jobTitle || !formData.companyName || !formData.jobDescription) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      toast.success('Cover letter generated successfully!')
    }, 2000)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6 overflow-hidden">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Cover Letter Generator
        </h1>
        <p className="text-muted-foreground">
          Create personalized cover letters with AI assistance
        </p>
      </div>

      {/* Main Content */}
      <div className="grid flex-1 gap-6 lg:grid-cols-2 overflow-hidden">

        {/* Input Form */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Job Details
            </CardTitle>
            <CardDescription>
              Enter the job information to generate a tailored cover letter
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full px-6 pb-6">
              <div className="space-y-6">

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Job Title *
                  </Label>
                  <Input
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    Company Name *
                  </Label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Job Description *
                  </Label>
                  <Textarea
                    rows={6}
                    value={formData.jobDescription}
                    onChange={(e) =>
                      handleInputChange('jobDescription', e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Writing Tone</Label>
                  <Select
                    value={formData.tone}
                    onValueChange={(v) => handleInputChange('tone', v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>

              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Output Preview */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Generated Cover Letter
              </CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full p-6">
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[600px] font-serif text-sm leading-relaxed"
              />
            </ScrollArea>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
