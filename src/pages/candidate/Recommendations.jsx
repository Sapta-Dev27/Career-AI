'use client'

import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Briefcase,
  Building2,
  Users,
  MapPin,
  Code,
  Cloud,
  BarChart3,
  Palette,
  ChevronDown,
  Search,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const salaryTrendData = [
  { month: 'Jan', senior: 155000, mid: 105000, junior: 72000 },
  { month: 'Feb', senior: 158000, mid: 108000, junior: 74000 },
  { month: 'Mar', senior: 162000, mid: 112000, junior: 78000 },
  { month: 'Apr', senior: 168000, mid: 115000, junior: 82000 },
  { month: 'May', senior: 172000, mid: 118000, junior: 85000 },
  { month: 'Jun', senior: 178000, mid: 122000, junior: 88000 },
]

const inDemandSkills = [
  { name: 'React', percentage: 92 },
  { name: 'TypeScript', percentage: 88 },
  { name: 'Python', percentage: 82 },
  { name: 'AWS', percentage: 78 },
  { name: 'Node.js', percentage: 72 },
  { name: 'Docker', percentage: 65 },
  { name: 'Kubernetes', percentage: 58 },
  { name: 'GraphQL', percentage: 52 },
]

const industryData = [
  { name: 'Tech', value: 35, color: 'oklch(0.68 0.16 165)' },
  { name: 'Finance', value: 22, color: 'oklch(0.55 0.2 250)' },
  { name: 'Healthcare', value: 18, color: 'oklch(0.7 0.15 45)' },
  { name: 'E-commerce', value: 15, color: 'oklch(0.65 0.18 320)' },
  { name: 'Other', value: 10, color: 'oklch(0.5 0.02 260)' },
]

const topCompanies = [
  { rank: 1, name: 'Google', openRoles: '1,250 open roles', salary: '$185,000', growth: '+12%' },
  { rank: 2, name: 'Meta', openRoles: '890 open roles', salary: '$178,000', growth: '+8%' },
  { rank: 3, name: 'Amazon', openRoles: '2,100 open roles', salary: '$165,000', growth: '+15%' },
  { rank: 4, name: 'Microsoft', openRoles: '1,800 open roles', salary: '$172,000', growth: '+10%' },
  { rank: 5, name: 'Apple', openRoles: '750 open roles', salary: '$182,000', growth: '+6%' },
]

const locationInsights = [
  { city: 'San Francisco', jobs: '12,500 jobs', cost: 'High cost', salary: '$175,000' },
  { city: 'New York', jobs: '11,200 jobs', cost: 'High cost', salary: '$165,000' },
  { city: 'Seattle', jobs: '8,400 jobs', cost: 'Medium cost', salary: '$160,000' },
  { city: 'Austin', jobs: '6,800 jobs', cost: 'Medium cost', salary: '$145,000' },
  { city: 'Remote', jobs: '25,000 jobs', cost: 'Varies cost', salary: '$140,000' },
]

const recommendedSkills = [
  { name: 'TypeScript', category: 'Language', growth: '+25%', icon: Code },
  { name: 'AWS', category: 'Cloud', growth: '+18%', icon: Cloud },
  { name: 'System Design', category: 'Architecture', growth: '+30%', icon: BarChart3 },
  { name: 'UI/UX', category: 'Design', growth: '+15%', icon: Palette },
]

export default function IndustryInsights() {
  const [selectedIndustry, setSelectedIndustry] = useState('finance')
  const [selectedRole, setSelectedRole] = useState('backend')

  const stats = [
    {
      title: 'Avg. Salary',
      value: '$145,000',
      change: '+8.5%',
      changeLabel: 'vs last month',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Open Positions',
      value: '24,500',
      change: '+12%',
      changeLabel: 'vs last month',
      trend: 'up',
      icon: Briefcase,
    },
    {
      title: 'Companies Hiring',
      value: '3,200',
      change: '+5.2%',
      changeLabel: 'vs last month',
      trend: 'up',
      icon: Building2,
    },
    {
      title: 'Remote Positions',
      value: '45%',
      change: '-2.1%',
      changeLabel: 'vs last month',
      trend: 'down',
      icon: Users,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Industry Insights</h1>
          <p className="text-muted-foreground">Real-time market trends and salary data</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="bg-card pl-9"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
          <SelectTrigger className="w-[140px] bg-card">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Tech</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="healthcare">Healthcare</SelectItem>
            <SelectItem value="ecommerce">E-commerce</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedRole} onValueChange={setSelectedRole}>
          <SelectTrigger className="w-[180px] bg-card">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="frontend">Frontend Developer</SelectItem>
            <SelectItem value="backend">Backend Developer</SelectItem>
            <SelectItem value="fullstack">Full Stack Developer</SelectItem>
            <SelectItem value="devops">DevOps Engineer</SelectItem>
            <SelectItem value="data">Data Engineer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border bg-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-accent" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                      <span
                        className={
                          stat.trend === 'up' ? 'text-sm text-accent' : 'text-sm text-destructive'
                        }
                      >
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">{stat.changeLabel}</span>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Salary Trends Chart */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">Salary Trends</CardTitle>
              <p className="text-sm text-muted-foreground">
                6-month salary progression by experience level
              </p>
            </div>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salaryTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 260)" />
                  <XAxis
                    dataKey="month"
                    stroke="oklch(0.5 0.02 260)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="oklch(0.5 0.02 260)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.14 0.02 260)',
                      border: '1px solid oklch(0.25 0.02 260)',
                      borderRadius: '8px',
                      color: 'oklch(0.95 0.01 240)',
                    }}
                    formatter={(value) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Line
                    type="monotone"
                    dataKey="senior"
                    stroke="oklch(0.55 0.2 250)"
                    strokeWidth={2}
                    dot={false}
                    name="Senior"
                  />
                  <Line
                    type="monotone"
                    dataKey="mid"
                    stroke="oklch(0.68 0.16 165)"
                    strokeWidth={2}
                    dot={false}
                    name="Mid-Level"
                  />
                  <Line
                    type="monotone"
                    dataKey="junior"
                    stroke="oklch(0.7 0.15 45)"
                    strokeWidth={2}
                    dot={false}
                    name="Junior"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* In-Demand Skills */}
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold">In-Demand Skills</CardTitle>
              <p className="text-sm text-muted-foreground">Most requested skills in job postings</p>
            </div>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inDemandSkills} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.25 0.02 260)"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="oklch(0.5 0.02 260)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="oklch(0.5 0.02 260)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.14 0.02 260)',
                      border: '1px solid oklch(0.25 0.02 260)',
                      borderRadius: '8px',
                      color: 'oklch(0.95 0.01 240)',
                    }}
                    formatter={(value) => [`${value}%`, 'Demand']}
                  />
                  <Bar dataKey="percentage" fill="oklch(0.55 0.2 250)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Jobs by Industry */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Jobs by Industry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="h-[200px] w-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {industryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'oklch(0.14 0.02 260)',
                        border: '1px solid oklch(0.25 0.02 260)',
                        borderRadius: '8px',
                        color: 'oklch(0.95 0.01 240)',
                      }}
                      formatter={(value) => [`${value}%`, '']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid w-full grid-cols-2 gap-2">
                {industryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Hiring Companies */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Hiring Companies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topCompanies.map((company) => (
              <div
                key={company.rank}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {company.rank}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{company.name}</p>
                    <p className="text-xs text-muted-foreground">{company.openRoles}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">{company.salary}</p>
                  <p className="text-xs text-accent">{company.growth}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Location Insights */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Location Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {locationInsights.map((location) => (
              <div
                key={location.city}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{location.city}</p>
                    <p className="text-xs text-muted-foreground">
                      {location.jobs} • {location.cost}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-foreground">{location.salary}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recommended Skills */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Recommended Skills to Learn</CardTitle>
            <p className="text-sm text-muted-foreground">
              Based on market demand and your current profile
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All Skills
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recommendedSkills.map((skill) => {
              const Icon = skill.icon
              return (
                <Card
                  key={skill.name}
                  className="border-border bg-card transition-colors hover:bg-muted/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-accent">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-sm font-medium">{skill.growth}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-semibold text-foreground">{skill.name}</h4>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
