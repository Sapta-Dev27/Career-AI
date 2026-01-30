'use client';

import { useState } from 'react'
import {
  Plus,
  Trash2,
  Download,
  Eye,
  Sparkles,
  Upload,
  GripVertical,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  FileText,
} from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'

const initialResumeData = {
  personal: {
    fullName: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexjohnson',
    website: 'alexjohnson.dev',
    summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Led teams to deliver high-impact projects, improving system performance by 40%.',
  },
  experience: [
    {
      id: 1,
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      description: '- Led development of microservices architecture serving 1M+ users\n- Mentored team of 4 junior developers\n- Reduced API response time by 60% through optimization\n- Implemented CI/CD pipeline reducing deployment time by 75%',
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2021-12',
      description: '- Built real-time collaboration features using WebSockets\n- Designed and implemented RESTful APIs\n- Improved test coverage from 40% to 85%',
    },
  ],
  education: [
    {
      id: 1,
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science in Computer Science',
      location: 'Berkeley, CA',
      graduationDate: '2019-05',
      gpa: '3.8',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL', 'GraphQL', 'Git'],
  certifications: [
    { id: 1, name: 'AWS Solutions Architect Associate', issuer: 'Amazon Web Services', date: '2023-03' },
    { id: 2, name: 'Professional Scrum Master I', issuer: 'Scrum.org', date: '2022-08' },
  ],
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState(initialResumeData)
  const [activeTab, setActiveTab] = useState('personal')
  const [previewMode, setPreviewMode] = useState(false)
  const [newSkill, setNewSkill] = useState('')

  const updatePersonal = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      school: '',
      degree: '',
      location: '',
      graduationDate: '',
      gpa: '',
    }
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
    }
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }))
  }

  const updateCertification = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    }))
  }

  const removeCertification = (id) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  const handleAIOptimize = () => {
    toast.success('AI optimization applied! Your resume has been enhanced.')
  }

  const handleDownload = () => {
    toast.success('Resume downloaded successfully!')
  }

  const handleUpload = () => {
    toast.info('Upload feature - Select a file to parse your existing resume')
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
          <p className="text-muted-foreground">Create an ATS-optimized resume with AI assistance</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </Button>
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button variant="outline" onClick={handleAIOptimize}>
            <Sparkles className="mr-2 h-4 w-4" />
            AI Optimize
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Editor Panel */}
        <div className={previewMode ? 'hidden lg:block' : ''}>
          <Card className="border-border">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent p-0">
                  <TabsTrigger
                    value="personal"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="education"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Education
                  </TabsTrigger>
                  <TabsTrigger
                    value="skills"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Skills
                  </TabsTrigger>
                  <TabsTrigger
                    value="certifications"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Certs
                  </TabsTrigger>
                </TabsList>

                <div className="p-6">
                  {/* Personal Info Tab */}
                  <TabsContent value="personal" className="m-0 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          value={resumeData.personal.fullName}
                          onChange={(e) => updatePersonal('fullName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={resumeData.personal.email}
                          onChange={(e) => updatePersonal('email', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={resumeData.personal.phone}
                          onChange={(e) => updatePersonal('phone', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personal.location}
                          onChange={(e) => updatePersonal('location', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={resumeData.personal.linkedin}
                          onChange={(e) => updatePersonal('linkedin', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={resumeData.personal.website}
                          onChange={(e) => updatePersonal('website', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="summary">Professional Summary</Label>
                      <Textarea
                        id="summary"
                        rows={4}
                        value={resumeData.personal.summary}
                        onChange={(e) => updatePersonal('summary', e.target.value)}
                        placeholder="Write a compelling summary of your professional background..."
                      />
                    </div>
                  </TabsContent>

                  {/* Experience Tab */}
                  <TabsContent value="experience" className="m-0 space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <Card key={exp.id} className="border-border">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Experience {index + 1}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Position</Label>
                              <Input
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                  type="month"
                                  value={exp.startDate}
                                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input
                                  value={exp.endDate}
                                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                  placeholder="Present"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              rows={4}
                              value={exp.description}
                              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                              placeholder="Describe your responsibilities and achievements..."
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent" onClick={addExperience}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </TabsContent>

                  {/* Education Tab */}
                  <TabsContent value="education" className="m-0 space-y-4">
                    {resumeData.education.map((edu, index) => (
                      <Card key={edu.id} className="border-border">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                            <span className="text-sm font-medium text-muted-foreground">Education {index + 1}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>School</Label>
                              <Input
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label>Graduation</Label>
                                <Input
                                  type="month"
                                  value={edu.graduationDate}
                                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>GPA</Label>
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                                  placeholder="3.8"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent" onClick={addEducation}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Education
                    </Button>
                  </TabsContent>

                  {/* Skills Tab */}
                  <TabsContent value="skills" className="m-0 space-y-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <Button onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1 px-3 py-1">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-destructive"
                            aria-label={`Remove ${skill}`}
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Certifications Tab */}
                  <TabsContent value="certifications" className="m-0 space-y-4">
                    {resumeData.certifications.map((cert, index) => (
                      <Card key={cert.id} className="border-border">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                          <span className="text-sm font-medium text-muted-foreground">Certification {index + 1}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeCertification(cert.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Certification Name</Label>
                              <Input
                                value={cert.name}
                                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Issuing Organization</Label>
                              <Input
                                value={cert.issuer}
                                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Date Obtained</Label>
                              <Input
                                type="month"
                                value={cert.date}
                                onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button variant="outline" className="w-full bg-transparent" onClick={addCertification}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Certification
                    </Button>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Resume Preview</CardTitle>
              </div>
              <Badge variant="outline">A4 Format</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
              {/* Resume Header */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-foreground">{resumeData.personal.fullName}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {resumeData.personal.email} | {resumeData.personal.phone} | {resumeData.personal.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  {resumeData.personal.linkedin} | {resumeData.personal.website}
                </p>
              </div>

              {/* Summary */}
              {resumeData.personal.summary && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Professional Summary</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{resumeData.personal.summary}</p>
                  </div>
                </>
              )}

              {/* Experience */}
              {resumeData.experience.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Experience</h2>
                    <div className="mt-3 space-y-4">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-foreground">{exp.position}</p>
                              <p className="text-sm text-muted-foreground">{exp.company} - {exp.location}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {exp.startDate} - {exp.endDate}
                            </p>
                          </div>
                          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Education</h2>
                    <div className="mt-3 space-y-3">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id} className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.school} - {edu.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{edu.graduationDate}</p>
                            {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Skills</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Certifications */}
              {resumeData.certifications.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-foreground">Certifications</h2>
                    <div className="mt-3 space-y-2">
                      {resumeData.certifications.map((cert) => (
                        <div key={cert.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-foreground">{cert.name}</p>
                            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{cert.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
