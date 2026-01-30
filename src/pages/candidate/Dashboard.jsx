import { Link } from 'react-router-dom'
import {
  FileText,
  MessageSquare,
  Mic,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Target,
  Award,
  BookOpen,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const stats = [
  {
    title: 'Career Progress',
    value: '72%',
    description: 'Profile completion',
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    title: 'Resumes Created',
    value: '3',
    description: '2 optimized by AI',
    icon: FileText,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    title: 'Mock Interviews',
    value: '8',
    description: 'Avg score: 85%',
    icon: Mic,
    color: 'text-chart-3',
    bgColor: 'bg-chart-3/10',
  },
  {
    title: 'Applications',
    value: '12',
    description: '4 in progress',
    icon: Briefcase,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
  },
]

const quickActions = [
  {
    title: 'AI Career Guidance',
    description: 'Get personalized career advice',
    icon: MessageSquare,
    href: '/candidate/career-guidance',
  },
  {
    title: 'Build Resume',
    description: 'Create an ATS-optimized resume',
    icon: FileText,
    href: '/candidate/resume-builder',
  },
  {
    title: 'Practice Interview',
    description: 'AI-powered mock interviews',
    icon: Mic,
    href: '/candidate/interview-prep',
  },
  {
    title: 'Browse Jobs',
    description: 'Find matching opportunities',
    icon: Briefcase,
    href: '/candidate/jobs',
  },
]

const recentActivity = [
  {
    type: 'resume',
    title: 'Resume Updated',
    description: 'Software Engineer Resume v2',
    time: '2 hours ago',
    icon: FileText,
  },
  {
    type: 'interview',
    title: 'Interview Completed',
    description: 'Frontend Developer - Score: 88%',
    time: '1 day ago',
    icon: CheckCircle2,
  },
  {
    type: 'application',
    title: 'Application Submitted',
    description: 'Senior Developer at TechCorp',
    time: '2 days ago',
    icon: Briefcase,
  },
  {
    type: 'guidance',
    title: 'Career Chat Session',
    description: 'Discussed skill development path',
    time: '3 days ago',
    icon: MessageSquare,
  },
]

const skillRecommendations = [
  { name: 'TypeScript', level: 'Intermediate', demand: 'High', progress: 65 },
  { name: 'System Design', level: 'Beginner', demand: 'High', progress: 30 },
  { name: 'AWS Services', level: 'Intermediate', demand: 'Very High', progress: 55 },
]

const careerInsights = [
  {
    title: 'Software Engineering Market',
    insight: 'Demand up 15% in your area',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Skill Gap Analysis',
    insight: '3 skills to focus on',
    action: 'View details',
    icon: Target,
  },
  {
    title: 'Interview Performance',
    insight: 'Top 20% of candidates',
    trend: 'up',
    icon: Award,
  },
]

export default function CandidateDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Alex</h1>
          <p className="text-muted-foreground">Here's an overview of your career journey</p>
        </div>
        <Button asChild>
          <Link to="/candidate/career-guidance">
            <MessageSquare className="mr-2 h-4 w-4" />
            Talk to AI Coach
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Jump into your most used tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Link
                      key={action.title}
                      to={action.href}
                      className="group flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Insights */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Career Insights</CardTitle>
            <CardDescription>Trends and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {careerInsights.map((insight) => {
              const Icon = insight.icon
              return (
                <div key={insight.title} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{insight.title}</p>
                    <p className="text-xs text-muted-foreground">{insight.insight}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skill Recommendations */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Skill Recommendations</CardTitle>
              <CardDescription>Based on your career goals</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/candidate/recommendations">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillRecommendations.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {skill.level}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {skill.demand} Demand
                  </Badge>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.time}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
