'use client';

import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  Upload,
  FileText,
  Check,
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Loader2,
  X,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

// Sample job data
const jobData = {
  id: '1',
  title: 'Senior Software Engineer',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  salary: '$150k - $200k',
  match: 92,
}

const savedResumes = [
  { id: '1', name: 'Software Engineer Resume v2', lastUpdated: 'Jan 15, 2026' },
  { id: '2', name: 'Full Stack Developer Resume', lastUpdated: 'Dec 20, 2025' },
]

export default function ApplyJob() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    resumeOption: 'saved',
    selectedResume: '',
    uploadedFile: null,
    coverLetter: '',
    useSavedCoverLetter: false,
    additionalInfo: '',
    agreedToTerms: false,
  })
  const [errors, setErrors] = useState({})

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        toast.error('Please upload a PDF or Word document')
        return
      }
      handleInputChange('uploadedFile', file)
    }
  }

  const removeFile = () => {
    handleInputChange('uploadedFile', null)
  }

  const validateStep = () => {
    const newErrors = {}
    
    if (step === 1) {
      if (formData.resumeOption === 'saved' && !formData.selectedResume) {
        newErrors.resume = 'Please select a resume'
      }
      if (formData.resumeOption === 'upload' && !formData.uploadedFile) {
        newErrors.resume = 'Please upload a resume'
      }
    }
    
    if (step === 3) {
      if (!formData.agreedToTerms) {
        newErrors.terms = 'You must agree to the terms'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsSubmitting(true)
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
          <Check className="h-10 w-10 text-accent" />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Application Submitted!</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Your application for {jobData.title} at {jobData.company} has been submitted successfully.
          You will receive a confirmation email shortly.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link to="/candidate/jobs">Browse More Jobs</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/candidate">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" asChild className="gap-2">
        <Link to={`/candidate/jobs/${id}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to Job Details
        </Link>
      </Button>

      {/* Job Summary */}
      <Card className="border-border">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Building2 className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{jobData.title}</h2>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{jobData.company}</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {jobData.location}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {jobData.salary}
                </span>
              </div>
            </div>
            <Badge className="bg-primary/20 text-primary">{jobData.match}% Match</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
          <span className="font-medium text-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span className={cn(step >= 1 && 'text-primary')}>Resume</span>
          <span className={cn(step >= 2 && 'text-primary')}>Cover Letter</span>
          <span className={cn(step >= 3 && 'text-primary')}>Review</span>
        </div>
      </div>

      {/* Step 1: Resume */}
      {step === 1 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Select Your Resume</CardTitle>
            <CardDescription>Choose a saved resume or upload a new one</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={formData.resumeOption}
              onValueChange={(value) => handleInputChange('resumeOption', value)}
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="saved" id="saved" className="mt-1" />
                  <Label htmlFor="saved" className="flex-1 cursor-pointer">
                    <span className="font-medium">Use Saved Resume</span>
                    <p className="text-sm text-muted-foreground">
                      Select from your previously uploaded resumes
                    </p>
                  </Label>
                </div>

                {formData.resumeOption === 'saved' && (
                  <div className="ml-6 space-y-2">
                    {savedResumes.map((resume) => (
                      <div
                        key={resume.id}
                        onClick={() => handleInputChange('selectedResume', resume.id)}
                        className={cn(
                          'cursor-pointer rounded-lg border p-4 transition-colors',
                          formData.selectedResume === resume.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{resume.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Last updated: {resume.lastUpdated}
                            </p>
                          </div>
                          {formData.selectedResume === resume.id && (
                            <Check className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="upload" id="upload" className="mt-1" />
                  <Label htmlFor="upload" className="flex-1 cursor-pointer">
                    <span className="font-medium">Upload New Resume</span>
                    <p className="text-sm text-muted-foreground">
                      Upload a PDF or Word document (max 5MB)
                    </p>
                  </Label>
                </div>

                {formData.resumeOption === 'upload' && (
                  <div className="ml-6">
                    {formData.uploadedFile ? (
                      <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{formData.uploadedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(formData.uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={removeFile}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 transition-colors hover:border-primary/50">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <p className="mt-2 text-sm font-medium text-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">PDF or Word (max 5MB)</p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </RadioGroup>

            {errors.resume && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.resume}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Step 2: Cover Letter */}
      {step === 2 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Cover Letter (Optional)</CardTitle>
            <CardDescription>Add a personalized cover letter to strengthen your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="useSaved"
                checked={formData.useSavedCoverLetter}
                onCheckedChange={(checked) => handleInputChange('useSavedCoverLetter', checked)}
              />
              <Label htmlFor="useSaved" className="text-sm">
                Use my AI-generated cover letter for this job
              </Label>
            </div>

            {!formData.useSavedCoverLetter && (
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Write Your Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  placeholder="Dear Hiring Manager,

I am writing to express my interest in the Senior Software Engineer position at TechCorp Inc..."
                  rows={10}
                />
                <p className="text-xs text-muted-foreground">
                  {formData.coverLetter.length} / 5000 characters
                </p>
              </div>
            )}

            <div className="rounded-lg bg-muted p-4">
              <h4 className="font-medium text-foreground">Tips for a Great Cover Letter</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- Address specific requirements mentioned in the job posting</li>
                <li>- Highlight relevant achievements with quantifiable results</li>
                <li>- Show enthusiasm for the company and role</li>
                <li>- Keep it concise (3-4 paragraphs)</li>
              </ul>
            </div>

            <Button variant="outline" asChild>
              <Link to="/candidate/cover-letter">Generate with AI</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Review Your Application</CardTitle>
            <CardDescription>Please review your information before submitting</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg border border-border p-4">
              <h4 className="font-medium text-foreground">Resume</h4>
              <div className="mt-2 flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  {formData.resumeOption === 'saved'
                    ? savedResumes.find((r) => r.id === formData.selectedResume)?.name
                    : formData.uploadedFile?.name}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h4 className="font-medium text-foreground">Cover Letter</h4>
              <p className="mt-2 text-muted-foreground">
                {formData.useSavedCoverLetter
                  ? 'Using AI-generated cover letter'
                  : formData.coverLetter
                  ? `${formData.coverLetter.substring(0, 100)}...`
                  : 'No cover letter provided'}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Is there anything else you'd like the employer to know?"
                rows={4}
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) => handleInputChange('agreedToTerms', checked)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I confirm that the information provided is accurate and I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            {errors.terms && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.terms}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={step === 1}>
          Back
        </Button>
        {step < totalSteps ? (
          <Button onClick={handleNext}>Continue</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
