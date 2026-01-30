'use client';

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  ChevronDown,
  Star,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const applicants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    avatar: null,
    initials: "SJ",
    role: "Senior Frontend Developer",
    status: "new",
    matchScore: 92,
    experience: "6 years",
    location: "San Francisco, CA",
    appliedAt: "2 hours ago",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    education: "MS Computer Science, Stanford",
    starred: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    avatar: null,
    initials: "MC",
    role: "Senior Frontend Developer",
    status: "reviewed",
    matchScore: 88,
    experience: "5 years",
    location: "New York, NY",
    appliedAt: "5 hours ago",
    skills: ["Vue.js", "JavaScript", "Python", "AWS"],
    education: "BS Software Engineering, MIT",
    starred: false,
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    avatar: null,
    initials: "ED",
    role: "Senior Frontend Developer",
    status: "interview",
    matchScore: 85,
    experience: "4 years",
    location: "Austin, TX",
    appliedAt: "1 day ago",
    skills: ["React", "Redux", "Tailwind CSS", "Jest"],
    education: "BS Computer Science, UT Austin",
    starred: true,
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@email.com",
    phone: "+1 (555) 456-7890",
    avatar: null,
    initials: "JW",
    role: "Senior Frontend Developer",
    status: "new",
    matchScore: 78,
    experience: "3 years",
    location: "Seattle, WA",
    appliedAt: "1 day ago",
    skills: ["Angular", "TypeScript", "RxJS", "Firebase"],
    education: "BS Information Technology, UW",
    starred: false,
  },
  {
    id: 5,
    name: "Lisa Martinez",
    email: "lisa.martinez@email.com",
    phone: "+1 (555) 567-8901",
    avatar: null,
    initials: "LM",
    role: "Senior Frontend Developer",
    status: "rejected",
    matchScore: 65,
    experience: "2 years",
    location: "Los Angeles, CA",
    appliedAt: "2 days ago",
    skills: ["React", "CSS", "HTML", "jQuery"],
    education: "Bootcamp Graduate",
    starred: false,
  },
  {
    id: 6,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 678-9012",
    avatar: null,
    initials: "DB",
    role: "Senior Frontend Developer",
    status: "hired",
    matchScore: 95,
    experience: "7 years",
    location: "Chicago, IL",
    appliedAt: "1 week ago",
    skills: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"],
    education: "MS Computer Science, Northwestern",
    starred: true,
  },
];

const statusConfig = {
  new: { label: "New", color: "bg-primary/10 text-primary", icon: Clock },
  reviewed: { label: "Reviewed", color: "bg-chart-3/10 text-chart-3", icon: Eye },
  interview: { label: "Interview", color: "bg-accent/10 text-accent", icon: Calendar },
  rejected: { label: "Rejected", color: "bg-destructive/10 text-destructive", icon: XCircle },
  hired: { label: "Hired", color: "bg-chart-2/10 text-chart-2", icon: CheckCircle },
};

export default function ApplicantsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || applicant.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectApplicant = (id) => {
    setSelectedApplicants((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedApplicants.length === filteredApplicants.length) {
      setSelectedApplicants([]);
    } else {
      setSelectedApplicants(filteredApplicants.map((a) => a.id));
    }
  };

  const statusCounts = {
    all: applicants.length,
    new: applicants.filter((a) => a.status === "new").length,
    reviewed: applicants.filter((a) => a.status === "reviewed").length,
    interview: applicants.filter((a) => a.status === "interview").length,
    hired: applicants.filter((a) => a.status === "hired").length,
    rejected: applicants.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Applicants
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and review candidates for your job postings
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select job" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="frontend">Senior Frontend Developer</SelectItem>
              <SelectItem value="pm">Product Manager</SelectItem>
              <SelectItem value="designer">UX Designer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search applicants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            {selectedApplicants.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {selectedApplicants.length} selected
                </span>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex">
          <TabsTrigger value="all" onClick={() => setSelectedStatus("all")}>
            All ({statusCounts.all})
          </TabsTrigger>
          <TabsTrigger value="new" onClick={() => setSelectedStatus("new")}>
            New ({statusCounts.new})
          </TabsTrigger>
          <TabsTrigger value="reviewed" onClick={() => setSelectedStatus("reviewed")}>
            Reviewed ({statusCounts.reviewed})
          </TabsTrigger>
          <TabsTrigger value="interview" onClick={() => setSelectedStatus("interview")}>
            Interview ({statusCounts.interview})
          </TabsTrigger>
          <TabsTrigger value="hired" onClick={() => setSelectedStatus("hired")}>
            Hired ({statusCounts.hired})
          </TabsTrigger>
          <TabsTrigger value="rejected" onClick={() => setSelectedStatus("rejected")}>
            Rejected ({statusCounts.rejected})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Applicants List */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedApplicants.length === filteredApplicants.length && filteredApplicants.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
                <span className="text-sm text-muted-foreground">
                  {filteredApplicants.length} applicants
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {filteredApplicants.map((applicant) => {
                  const StatusIcon = statusConfig[applicant.status].icon;
                  return (
                    <div
                      key={applicant.id}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <Checkbox
                        checked={selectedApplicants.includes(applicant.id)}
                        onCheckedChange={() => toggleSelectApplicant(applicant.id)}
                      />
                      <button
                        className={`text-muted-foreground hover:text-chart-3 transition-colors ${
                          applicant.starred ? "text-chart-3" : ""
                        }`}
                      >
                        <Star className={`h-4 w-4 ${applicant.starred ? "fill-current" : ""}`} />
                      </button>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={applicant.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {applicant.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground truncate">
                            {applicant.name}
                          </h4>
                          <Badge className={statusConfig[applicant.status].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[applicant.status].label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {applicant.experience} experience • {applicant.location}
                        </p>
                      </div>
                      <div className="hidden lg:flex items-center gap-6">
                        <div className="text-center w-24">
                          <div className="flex items-center gap-2 justify-center">
                            <Progress value={applicant.matchScore} className="w-16 h-2" />
                            <span className="text-sm font-medium">{applicant.matchScore}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Match</p>
                        </div>
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {applicant.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {applicant.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{applicant.skills.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {applicant.appliedAt}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download Resume
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Add Note
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-accent">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Move to Interview
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tab contents would show filtered lists */}
        {["new", "reviewed", "interview", "hired", "rejected"].map((status) => (
          <TabsContent key={status} value={status}>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center text-muted-foreground">
                Showing {statusCounts[status]} {status} applicants
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
