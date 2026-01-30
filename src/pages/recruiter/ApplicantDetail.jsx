'use client';

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Download,
  Star,
  MessageSquare,
  Clock,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  CheckCircle,
  XCircle,
  Send,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const applicant = {
  id: 1,
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  avatar: null,
  initials: "SJ",
  role: "Senior Frontend Developer",
  status: "interview",
  matchScore: 92,
  experience: "6 years",
  location: "San Francisco, CA",
  appliedAt: "January 28, 2026",
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "Jest", "Tailwind CSS"],
  education: [
    {
      degree: "MS Computer Science",
      school: "Stanford University",
      year: "2018",
    },
    {
      degree: "BS Computer Science",
      school: "UC Berkeley",
      year: "2016",
    },
  ],
  experience_list: [
    {
      title: "Senior Frontend Developer",
      company: "Tech Corp",
      duration: "2021 - Present",
      description: "Led frontend development for flagship product, improving performance by 40%.",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      duration: "2018 - 2021",
      description: "Built and maintained React-based web applications for B2B clients.",
    },
  ],
  summary: "Passionate frontend developer with 6+ years of experience building scalable web applications. Strong expertise in React ecosystem and modern JavaScript. Led multiple successful product launches and mentored junior developers.",
  linkedin: "linkedin.com/in/sarahjohnson",
  portfolio: "sarahjohnson.dev",
  starred: true,
};

const timeline = [
  {
    id: 1,
    type: "applied",
    title: "Application Received",
    description: "Sarah applied for Senior Frontend Developer position",
    date: "Jan 28, 2026",
    time: "10:30 AM",
  },
  {
    id: 2,
    type: "reviewed",
    title: "Application Reviewed",
    description: "Resume and portfolio reviewed by hiring manager",
    date: "Jan 28, 2026",
    time: "2:45 PM",
  },
  {
    id: 3,
    type: "interview",
    title: "Interview Scheduled",
    description: "Technical interview scheduled for Jan 30",
    date: "Jan 29, 2026",
    time: "9:00 AM",
  },
];

const notes = [
  {
    id: 1,
    author: "John Smith",
    initials: "JS",
    content: "Strong technical background. Portfolio shows excellent React projects. Recommend moving forward.",
    date: "Jan 28, 2026",
  },
  {
    id: 2,
    author: "Emily Chen",
    initials: "EC",
    content: "Had a brief phone screen. Very articulate and passionate about frontend development.",
    date: "Jan 29, 2026",
  },
];

const aiInsights = [
  { label: "Technical Skills", score: 95, description: "Excellent match with job requirements" },
  { label: "Experience Level", score: 90, description: "Exceeds minimum experience requirement" },
  { label: "Culture Fit", score: 88, description: "Based on communication style analysis" },
  { label: "Growth Potential", score: 92, description: "Shows continuous learning pattern" },
];

export default function ApplicantDetail() {
  const { id } = useParams();
  const [newNote, setNewNote] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/recruiter/applicants">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Applicant Profile
          </h1>
          <p className="text-muted-foreground">
            Reviewing application for {applicant.role}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <XCircle className="h-4 w-4" />
            Reject
          </Button>
          <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
            <CheckCircle className="h-4 w-4" />
            Move Forward
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {applicant.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-foreground">{applicant.name}</h2>
                        <button className="text-chart-3">
                          <Star className="h-5 w-5 fill-current" />
                        </button>
                      </div>
                      <p className="text-muted-foreground">{applicant.role}</p>
                    </div>
                    <Badge className="bg-accent/10 text-accent">
                      <Calendar className="h-3 w-3 mr-1" />
                      Interview Stage
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {applicant.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {applicant.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {applicant.location}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Download className="h-4 w-4" />
                      Download Resume
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      Portfolio
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <ExternalLink className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              {/* Summary */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{applicant.summary}</p>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Work Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {applicant.experience_list.map((exp, index) => (
                    <div key={index} className="relative pl-6 border-l-2 border-border">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                      <h4 className="font-medium text-foreground">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company} • {exp.duration}</p>
                      <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {applicant.education.map((edu, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-foreground">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.school} • {edu.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {applicant.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Application Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {timeline.map((event, index) => (
                      <div key={event.id} className="relative pl-6 border-l-2 border-border pb-6 last:pb-0">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium text-foreground">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {event.date} at {event.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Team Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add Note */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Add a note about this candidate..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <Button size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Add Note
                    </Button>
                  </div>

                  <Separator />

                  {/* Notes List */}
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {note.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground text-sm">{note.author}</span>
                            <span className="text-xs text-muted-foreground">{note.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{note.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Match Score */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Match Analysis
              </CardTitle>
              <CardDescription>
                AI-powered candidate evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(applicant.matchScore / 100) * 352} 352`}
                      className="text-primary"
                    />
                  </svg>
                  <span className="absolute text-3xl font-bold text-foreground">
                    {applicant.matchScore}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Overall Match Score</p>
              </div>

              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <div key={insight.label} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{insight.label}</span>
                      <span className="font-medium text-foreground">{insight.score}%</span>
                    </div>
                    <Progress value={insight.score} className="h-2" />
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <MessageSquare className="h-4 w-4" />
                Request Feedback
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Export Profile
              </Button>
            </CardContent>
          </Card>

          {/* Application Info */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Application Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Applied</span>
                <span className="text-foreground">{applicant.appliedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Position</span>
                <span className="text-foreground">{applicant.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Experience</span>
                <span className="text-foreground">{applicant.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Source</span>
                <span className="text-foreground">LinkedIn</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
