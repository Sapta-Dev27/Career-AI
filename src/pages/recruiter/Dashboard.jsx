'use client';

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

const stats = [
  {
    title: "Active Jobs",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Applicants",
    value: "284",
    change: "+18%",
    trend: "up",
    icon: Users,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Job Views",
    value: "1,429",
    change: "+24%",
    trend: "up",
    icon: Eye,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Hire Rate",
    value: "68%",
    change: "-3%",
    trend: "down",
    icon: TrendingUp,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
];

const recentApplicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Frontend Developer",
    avatar: null,
    initials: "SJ",
    status: "new",
    matchScore: 92,
    appliedAt: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Frontend Developer",
    avatar: null,
    initials: "MC",
    status: "reviewed",
    matchScore: 88,
    appliedAt: "5 hours ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Product Manager",
    avatar: null,
    initials: "ED",
    status: "interview",
    matchScore: 85,
    appliedAt: "1 day ago",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "UX Designer",
    avatar: null,
    initials: "JW",
    status: "new",
    matchScore: 78,
    appliedAt: "1 day ago",
  },
];

const activeJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    applicants: 45,
    newApplicants: 8,
    views: 234,
    daysLeft: 12,
    status: "active",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    applicants: 32,
    newApplicants: 3,
    views: 189,
    daysLeft: 8,
    status: "active",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    applicants: 28,
    newApplicants: 5,
    views: 156,
    daysLeft: 15,
    status: "active",
  },
];

const upcomingInterviews = [
  {
    id: 1,
    candidate: "Sarah Johnson",
    role: "Senior Frontend Developer",
    time: "10:00 AM",
    date: "Today",
    type: "Technical",
  },
  {
    id: 2,
    candidate: "Emily Davis",
    role: "Product Manager",
    time: "2:00 PM",
    date: "Today",
    type: "Final",
  },
  {
    id: 3,
    candidate: "Alex Thompson",
    role: "Backend Developer",
    time: "11:00 AM",
    date: "Tomorrow",
    type: "Initial",
  },
];

const statusColors = {
  new: "bg-primary/10 text-primary",
  reviewed: "bg-chart-3/10 text-chart-3",
  interview: "bg-accent/10 text-accent",
  rejected: "bg-destructive/10 text-destructive",
  hired: "bg-chart-2/10 text-chart-2",
};

export default function RecruiterDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Recruiter Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your job postings and track applicants
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/recruiter/post-job">
            <Plus className="h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-accent" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Active Jobs */}
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>
                Monitor performance of your job listings
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/recruiter/jobs">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{job.title}</h4>
                      {job.newApplicants > 0 && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {job.newApplicants} new
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.department}</p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <p className="font-medium text-foreground">{job.applicants}</p>
                      <p className="text-muted-foreground">Applicants</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">{job.views}</p>
                      <p className="text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium text-foreground">{job.daysLeft}d</p>
                      <p className="text-muted-foreground">Left</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Interviews
            </CardTitle>
            <CardDescription>Your scheduled interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) => (
                <div
                  key={interview.id}
                  className="flex items-start gap-3 rounded-lg border border-border/50 p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-foreground">{interview.candidate}</p>
                    <p className="text-sm text-muted-foreground">{interview.role}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Badge variant="outline">{interview.type}</Badge>
                      <span className="text-muted-foreground">
                        {interview.date} at {interview.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applicants */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Applicants</CardTitle>
            <CardDescription>
              Latest candidates who applied to your jobs
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center justify-between rounded-lg border border-border/50 p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {applicant.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-foreground">{applicant.name}</h4>
                    <p className="text-sm text-muted-foreground">{applicant.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2">
                      <Progress value={applicant.matchScore} className="w-20 h-2" />
                      <span className="text-sm font-medium text-foreground">
                        {applicant.matchScore}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Match Score</p>
                  </div>
                  <Badge className={statusColors[applicant.status]}>
                    {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{applicant.appliedAt}</span>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
