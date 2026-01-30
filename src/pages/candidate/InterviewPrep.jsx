'use client';

import { useState } from 'react'
import {
  Mic,
  MicOff,
  Play,
  Pause,
  SkipForward,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  Target,
  Sparkles,
  ChevronRight,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const roles = [
  { value: 'software-engineer', label: 'Software Engineer' },
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' },
  { value: 'fullstack-developer', label: 'Full Stack Developer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'product-manager', label: 'Product Manager' },
  { value: 'ux-designer', label: 'UX Designer' },
]

const experienceLevels = [
  { value: 'entry', label: 'Entry Level (0-2 years)' },
  { value: 'mid', label: 'Mid Level (2-5 years)' },
  { value: 'senior', label: 'Senior (5-10 years)' },
  { value: 'lead', label: 'Lead/Principal (10+ years)' },
]

const interviewTypes = [
  { value: 'behavioral', label: 'Behavioral', description: 'STAR method questions' },
  { value: 'technical', label: 'Technical', description: 'Coding & system design' },
  { value: 'mixed', label: 'Mixed', description: 'Combination of both' },
]

const sampleQuestions = [
  {
    id: 1,
    question: 'Tell me about a time when you had to deal with a difficult team member. How did you handle the situation?',
    type: 'behavioral',
    difficulty: 'medium',
    tips: ['Use the STAR method', 'Focus on your actions', 'Highlight positive outcomes'],
  },
  {
    id: 2,
    question: 'Describe a project where you had to learn a new technology quickly. What was your approach?',
    type: 'behavioral',
    difficulty: 'medium',
    tips: ['Emphasize learning agility', 'Mention specific resources used', 'Quantify the outcome if possible'],
  },
  {
    id: 3,
    question: 'How would you design a URL shortening service like bit.ly?',
    type: 'technical',
    difficulty: 'hard',
    tips: ['Start with requirements clarification', 'Discuss trade-offs', 'Consider scalability'],
  },
  {
    id: 4,
    question: 'What is your greatest professional achievement?',
    type: 'behavioral',
    difficulty: 'easy',
    tips: ['Choose a relevant achievement', 'Use metrics to quantify impact', 'Explain your specific role'],
  },
  {
    id: 5,
    question: 'Explain the difference between REST and GraphQL. When would you use each?',
    type: 'technical',
    difficulty: 'medium',
    tips: ['Compare pros and cons', 'Give real-world examples', 'Show understanding of use cases'],
  },
]

const sampleFeedback = {
  score: 85,
  strengths: [
    'Clear and structured response using STAR method',
    'Good use of specific examples',
    'Demonstrated problem-solving skills',
  ],
  improvements: [
    'Could provide more quantifiable metrics',
    'Consider mentioning long-term impact',
    'Practice more concise delivery',
  ],
  tips: [
    'Try to include specific numbers and percentages when discussing outcomes',
    'Keep responses between 2-3 minutes for optimal engagement',
  ],
}

export default function InterviewPrep() {
  const [selectedRole, setSelectedRole] = useState('software-engineer')
  const [selectedLevel, setSelectedLevel] = useState('mid')
  const [selectedType, setSelectedType] = useState('mixed')
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [completedQuestions, setCompletedQuestions] = useState([])
  const [elapsedTime, setElapsedTime] = useState(0)

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / sampleQuestions.length) * 100

  const startSession = () => {
    setIsSessionActive(true)
    setCurrentQuestionIndex(0)
    setCompletedQuestions([])
    setShowFeedback(false)
    setUserAnswer('')
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const submitAnswer = () => {
    setShowFeedback(true)
    setCompletedQuestions([...completedQuestions, currentQuestionIndex])
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setShowFeedback(false)
      setUserAnswer('')
      setIsRecording(false)
    }
  }

  const resetSession = () => {
    setIsSessionActive(false)
    setCurrentQuestionIndex(0)
    setCompletedQuestions([])
    setShowFeedback(false)
    setUserAnswer('')
    setIsRecording(false)
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-accent/20 text-accent'
      case 'medium':
        return 'bg-chart-3/20 text-chart-3'
      case 'hard':
        return 'bg-destructive/20 text-destructive'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Interview Preparation</h1>
          <p className="text-muted-foreground">Practice with AI-powered mock interviews and get instant feedback</p>
        </div>
        {isSessionActive && (
          <Button variant="outline" onClick={resetSession}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset Session
          </Button>
        )}
      </div>

      {!isSessionActive ? (
        /* Setup Phase */
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Configure Your Interview</CardTitle>
              <CardDescription>Select your preferences to start a personalized mock interview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Target Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Experience Level</Label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Interview Type</Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {interviewTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value)}
                      className={cn(
                        'rounded-lg border p-4 text-left transition-colors',
                        selectedType === type.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <p className="font-medium text-foreground">{type.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={startSession}>
                <Play className="mr-2 h-4 w-4" />
                Start Mock Interview
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Your Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sessions Completed</span>
                  <span className="font-semibold text-foreground">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Score</span>
                  <span className="font-semibold text-foreground">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Questions Practiced</span>
                  <span className="font-semibold text-foreground">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Practice Time</span>
                  <span className="font-semibold text-foreground">5.2 hrs</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Tips for Success</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Target className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Use the STAR method for behavioral questions</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Keep answers between 2-3 minutes</p>
                </div>
                <div className="flex items-start gap-2">
                  <Award className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">Practice speaking clearly and confidently</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* Interview Session */
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Progress */}
            <Card className="border-border">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {sampleQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-foreground">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="mt-2" />
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant="secondary">{currentQuestion.type}</Badge>
                      <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Volume2 className="h-5 w-5" />
                    <span className="sr-only">Listen to question</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recording Controls */}
                <div className="flex items-center justify-center gap-4 rounded-lg bg-muted p-6">
                  <Button
                    size="lg"
                    variant={isRecording ? 'destructive' : 'default'}
                    onClick={toggleRecording}
                    className="h-16 w-16 rounded-full"
                  >
                    {isRecording ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                    <span className="sr-only">{isRecording ? 'Stop recording' : 'Start recording'}</span>
                  </Button>
                  {isRecording && (
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 animate-pulse rounded-full bg-destructive" />
                      <span className="text-sm text-muted-foreground">Recording...</span>
                    </div>
                  )}
                </div>

                {/* Text Answer */}
                <div className="space-y-2">
                  <Label>Or type your answer:</Label>
                  <Textarea
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    rows={6}
                    disabled={showFeedback}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {!showFeedback ? (
                    <Button className="flex-1" onClick={submitAnswer} disabled={!userAnswer.trim() && !isRecording}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Submit & Get Feedback
                    </Button>
                  ) : (
                    <Button className="flex-1" onClick={nextQuestion}>
                      Next Question
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="outline" onClick={nextQuestion}>
                    <SkipForward className="mr-2 h-4 w-4" />
                    Skip
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Feedback */}
            {showFeedback && (
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      AI Feedback
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-primary">{sampleFeedback.score}</span>
                      <span className="text-sm text-muted-foreground">/ 100</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 font-medium text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        {sampleFeedback.strengths.map((strength, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 font-medium text-foreground">
                        <Target className="h-4 w-4 text-chart-3" />
                        Areas to Improve
                      </h4>
                      <ul className="space-y-2">
                        {sampleFeedback.improvements.map((improvement, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {improvement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted p-4">
                    <h4 className="font-medium text-foreground">Pro Tips</h4>
                    <ul className="mt-2 space-y-1">
                      {sampleFeedback.tips.map((tip, index) => (
                        <li key={index} className="text-sm text-muted-foreground">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Question Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {currentQuestion.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Session Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sampleQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className={cn(
                        'flex items-center gap-3 rounded-md p-2',
                        index === currentQuestionIndex && 'bg-primary/10',
                        completedQuestions.includes(index) && 'opacity-50'
                      )}
                    >
                      {completedQuestions.includes(index) ? (
                        <CheckCircle2 className="h-4 w-4 text-accent" />
                      ) : index === currentQuestionIndex ? (
                        <div className="h-4 w-4 rounded-full border-2 border-primary" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span className="text-sm text-muted-foreground">Question {index + 1}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {q.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
