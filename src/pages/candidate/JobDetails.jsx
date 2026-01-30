'use client';

import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  Bookmark,
  BookmarkCheck,
  Share2,
  ExternalLink,
  CheckCircle2,
  Users,
  Calendar,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Sample job data - in a real app, this would come from an API
const jobData = {
  id: '1',
  title: 'Senior Software Engineer',
  company: 'TechCorp Inc.',
  companyDescription: 'TechCorp is a leading technology company specializing in cloud solutions and AI-powered products. We serve over 10,000 customers worldwide and are growing rapidly.',
  location: 'San Francisco, CA',
  type: 'Full-time',
  remote: 'Hybrid',
  salary: '$150k - $200k',
  experience: '5+ years',
  posted: '2 days ago',
  deadline: 'March 15, 2026',
  applicants: 45,
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'GraphQL'],
  match: 92,
  saved: false,
  description: `We are looking for an experienced Senior Software Engineer to join our growing engineering team. In this role, you will be responsible for designing and implementing scalable backend services, mentoring junior developers, and contributing to our technical architecture decisions.

You will work closely with product managers, designers, and other engineers to deliver high-quality features that impact millions of users. This is an excellent opportunity to work on challenging problems in a collaborative environment.`,
  responsibilities: [
    'Design, develop, and maintain scalable backend services and APIs',
    'Lead technical design discussions and code reviews',
    'Mentor junior team members and help them grow',
    'Collaborate with cross-functional teams to deliver features',
    'Participate in on-call rotation and incident response',
    'Contribute to technical documentation and best practices',
  ],
  requirements: [
    '5+ years of experience in software engineering',
    'Strong proficiency in React, Node.js, and TypeScript',
    'Experience with cloud platforms (AWS preferred)',
    'Solid understanding of database design and SQL',
    'Excellent communication and collaboration skills',
    'Bachelor\'s degree in Computer Science or related field',
  ],
  niceToHave: [
    'Experience with GraphQL and microservices architecture',
    'Knowledge of containerization (Docker, Kubernetes)',
    'Previous experience in a leadership or mentoring role',
    'Contributions to open-source projects',
  ],
  benefits: [
    'Competitive salary and equity package',
    'Comprehensive health, dental, and vision insurance',
    'Flexible work arrangements (hybrid/remote options)',
    '401(k) with company match',
    'Professional development budget',
    'Unlimited PTO policy',
    'Parental leave',
    'Free lunch and snacks in office',
  ],
  companyInfo: {
    size: '500-1000 employees',
    industry: 'Technology',
    founded: '2015',
    website: 'https://techcorp.example.com',
  },
}

export default function JobDetails() {
  const { id } = useParams()
  const [isSaved, setIsSaved] = useState(jobData.saved)

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard')
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="gap-2">
        <Link to="/candidate/jobs">
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Header Card */}
          <Card className="border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{jobData.title}</h1>
                    <p className="mt-1 text-lg text-muted-foreground">{jobData.company}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {jobData.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {jobData.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {jobData.salary}
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary text-lg">{jobData.match}% Match</Badge>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="outline">{jobData.remote}</Badge>
                <Badge variant="outline">{jobData.experience}</Badge>
                {jobData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to={`/candidate/jobs/${id}/apply`}>Apply Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleSave}
                  className={cn(isSaved && 'text-primary')}
                >
                  {isSaved ? (
                    <BookmarkCheck className="mr-2 h-5 w-5" />
                  ) : (
                    <Bookmark className="mr-2 h-5 w-5" />
                  )}
                  {isSaved ? 'Saved' : 'Save Job'}
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>About This Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="whitespace-pre-line text-muted-foreground">{jobData.description}</p>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">Responsibilities</h3>
                <ul className="space-y-2">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">Requirements</h3>
                <ul className="space-y-2">
                  {jobData.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">Nice to Have</h3>
                <ul className="space-y-2">
                  {jobData.niceToHave.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-foreground">Benefits</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {jobData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Company */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>About {jobData.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{jobData.companyDescription}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {jobData.companyInfo.size}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  {jobData.companyInfo.industry}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Founded {jobData.companyInfo.founded}
                </div>
              </div>
              <Button variant="outline" className="mt-4 bg-transparent" asChild>
                <a href={jobData.companyInfo.website} target="_blank" rel="noopener noreferrer">
                  Visit Website
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Job Summary Card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Posted</span>
                <span className="text-sm font-medium text-foreground">{jobData.posted}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Deadline</span>
                <span className="text-sm font-medium text-foreground">{jobData.deadline}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Applicants</span>
                <span className="text-sm font-medium text-foreground">{jobData.applicants}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Experience</span>
                <span className="text-sm font-medium text-foreground">{jobData.experience}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Work Type</span>
                <span className="text-sm font-medium text-foreground">{jobData.remote}</span>
              </div>
            </CardContent>
          </Card>

          {/* Skills Match Card */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Your Skills Match</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary">
                  <span className="text-2xl font-bold text-foreground">{jobData.match}%</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">React - Strong match</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Node.js - Strong match</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">TypeScript - Strong match</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-chart-3" />
                  <span className="text-sm text-muted-foreground">GraphQL - Partial match</span>
                </div>
              </div>
              <Button variant="outline" className="mt-4 w-full bg-transparent" asChild>
                <Link to="/candidate/recommendations">Improve Skills</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Similar Jobs */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Similar Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Full Stack Engineer', company: 'StartupXYZ', match: 85 },
                { title: 'Backend Developer', company: 'Data Solutions', match: 78 },
                { title: 'Tech Lead', company: 'Enterprise Inc', match: 72 },
              ].map((job, index) => (
                <Link
                  key={index}
                  to={`/candidate/jobs/${index + 2}`}
                  className="block rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                >
                  <p className="font-medium text-foreground">{job.title}</p>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <Badge className="mt-2 bg-primary/20 text-primary">{job.match}% Match</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
