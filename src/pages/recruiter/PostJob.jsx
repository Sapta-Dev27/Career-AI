'use client';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  FileText,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Loader2,
  Plus,
  X,
  Building,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: 1, title: "Basic Info", icon: Briefcase },
  { id: 2, title: "Details", icon: FileText },
  { id: 3, title: "Requirements", icon: GraduationCap },
  { id: 4, title: "Review", icon: Check },
];

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Executive"];
const workModes = ["Remote", "On-site", "Hybrid"];

export default function PostJob() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    jobType: "",
    workMode: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    showSalary: true,
    description: "",
    responsibilities: "",
    requirements: "",
    skills: [],
    benefits: [],
    applicationDeadline: "",
    startDate: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const addBenefit = () => {
    if (benefitInput.trim() && !formData.benefits.includes(benefitInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput.trim()],
      }));
      setBenefitInput("");
    }
  };

  const removeBenefit = (benefit) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((b) => b !== benefit),
    }));
  };

  const generateAIDescription = async () => {
    setIsGeneratingAI(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormData((prev) => ({
      ...prev,
      description: `We are seeking a talented ${prev.title || "professional"} to join our ${prev.department || "team"}. This is an exciting opportunity to work on cutting-edge projects and make a significant impact.\n\nAs a key member of our team, you will collaborate with cross-functional teams to deliver exceptional results while growing your skills in a supportive environment.`,
      responsibilities: `• Lead and participate in the design and development of innovative solutions\n• Collaborate with cross-functional teams to define and implement new features\n• Mentor junior team members and contribute to technical discussions\n• Ensure code quality through testing and code reviews\n• Stay up-to-date with industry trends and best practices`,
      requirements: `• Bachelor's degree in a relevant field or equivalent experience\n• ${prev.experienceLevel === "Senior Level" ? "5+ years" : prev.experienceLevel === "Mid Level" ? "3+ years" : "1+ years"} of relevant experience\n• Strong problem-solving and communication skills\n• Ability to work independently and as part of a team\n• Passion for continuous learning and improvement`,
    }));
    setIsGeneratingAI(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    navigate("/recruiter/dashboard");
  };

  const progress = (currentStep / steps.length) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  placeholder="e.g., Engineering"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Work Mode *</Label>
                <Select
                  value={formData.workMode}
                  onValueChange={(value) => handleInputChange("workMode", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work mode" />
                  </SelectTrigger>
                  <SelectContent>
                    {workModes.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Job Type *</Label>
                <Select
                  value={formData.jobType}
                  onValueChange={(value) => handleInputChange("jobType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Experience Level *</Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) => handleInputChange("experienceLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Salary Range</Label>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.showSalary}
                    onCheckedChange={(checked) => handleInputChange("showSalary", checked)}
                  />
                  <span className="text-sm text-muted-foreground">Show on listing</span>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Min salary"
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Max salary"
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Job Description</h3>
                <p className="text-sm text-muted-foreground">
                  Describe the role and what makes it exciting
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={generateAIDescription}
                disabled={isGeneratingAI}
                className="gap-2 bg-transparent"
              >
                {isGeneratingAI ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Generate with AI
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Write a compelling description of the role..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                placeholder="List the main responsibilities for this role..."
                value={formData.responsibilities}
                onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                rows={6}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements *</Label>
              <Textarea
                id="requirements"
                placeholder="List the qualifications and requirements..."
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                rows={6}
              />
            </div>

            <div className="space-y-4">
              <Label>Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1 pr-1">
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label>Benefits & Perks</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a benefit..."
                  value={benefitInput}
                  onChange={(e) => setBenefitInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" onClick={addBenefit} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.benefits.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.benefits.map((benefit) => (
                    <Badge key={benefit} variant="outline" className="gap-1 pr-1">
                      {benefit}
                      <button
                        onClick={() => removeBenefit(benefit)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.applicationDeadline}
                  onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Expected Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{formData.title || "Job Title"}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {formData.department || "Department"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {formData.location || "Location"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {formData.jobType || "Job Type"}
                    </span>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  {formData.workMode || "Work Mode"}
                </Badge>
              </div>

              {formData.showSalary && (formData.salaryMin || formData.salaryMax) && (
                <div className="flex items-center gap-2 text-foreground">
                  <DollarSign className="h-5 w-5 text-accent" />
                  <span className="font-semibold">
                    ${formData.salaryMin || "0"} - ${formData.salaryMax || "0"} / year
                  </span>
                </div>
              )}

              {formData.description && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About the Role</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{formData.description}</p>
                </div>
              )}

              {formData.responsibilities && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Responsibilities</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{formData.responsibilities}</p>
                </div>
              )}

              {formData.requirements && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Requirements</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{formData.requirements}</p>
                </div>
              )}

              {formData.skills.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.benefits.length > 0 && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Benefits & Perks</h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Post a New Job
        </h1>
        <p className="text-muted-foreground mt-1">
          Create a job posting to attract the best candidates
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 ${
                  step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                    ? "text-accent"
                    : "text-muted-foreground"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    step.id === currentStep
                      ? "border-primary bg-primary text-primary-foreground"
                      : step.id < currentStep
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-muted"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter the basic information about the job"}
            {currentStep === 2 && "Provide a detailed description of the role"}
            {currentStep === 3 && "Specify the requirements and skills needed"}
            {currentStep === 4 && "Review your job posting before publishing"}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={() => setCurrentStep((prev) => prev + 1)} className="gap-2">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Publish Job
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
