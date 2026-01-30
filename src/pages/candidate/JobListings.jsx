'use client';

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
  Filter,
  X,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const jobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    remote: 'Hybrid',
    salary: '$150k - $200k',
    experience: '5+ years',
    posted: '2 days ago',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
    logo: null,
    description: 'We are looking for a senior software engineer to join our growing team...',
    match: 92,
    saved: false,
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'New York, NY',
    type: 'Full-time',
    remote: 'Remote',
    salary: '$120k - $160k',
    experience: '3-5 years',
    posted: '1 week ago',
    skills: ['Python', 'Django', 'React', 'PostgreSQL'],
    logo: null,
    description: 'Join our fast-paced startup building the future of fintech...',
    match: 85,
    saved: true,
  },
  {
    id: '3',
    title: 'Frontend Engineer',
    company: 'Design Studio Co',
    location: 'Austin, TX',
    type: 'Full-time',
    remote: 'On-site',
    salary: '$110k - $140k',
    experience: '2-4 years',
    posted: '3 days ago',
    skills: ['React', 'Vue.js', 'CSS', 'Figma'],
    logo: null,
    description: 'Create beautiful user experiences for our clients...',
    match: 78,
    saved: false,
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'Cloud Systems Ltd',
    location: 'Seattle, WA',
    type: 'Full-time',
    remote: 'Remote',
    salary: '$140k - $180k',
    experience: '4+ years',
    posted: '5 days ago',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    logo: null,
    description: 'Build and maintain our cloud infrastructure...',
    match: 72,
    saved: false,
  },
  {
    id: '5',
    title: 'Backend Developer',
    company: 'Data Solutions Inc',
    location: 'Boston, MA',
    type: 'Full-time',
    remote: 'Hybrid',
    salary: '$130k - $170k',
    experience: '3-5 years',
    posted: '1 day ago',
    skills: ['Java', 'Spring Boot', 'MongoDB', 'Redis'],
    logo: null,
    description: 'Design and implement scalable backend services...',
    match: 68,
    saved: false,
  },
]

const experienceLevels = ['Entry Level', '1-2 years', '2-4 years', '3-5 years', '4+ years', '5+ years']
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship']
const remoteOptions = ['On-site', 'Hybrid', 'Remote']

export default function JobListings() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationQuery, setLocationQuery] = useState('')
  const [sortBy, setSortBy] = useState('match')
  const [jobsList, setJobsList] = useState(jobs)
  const [filters, setFilters] = useState({
    experience: [],
    type: [],
    remote: [],
  })

  const toggleSaved = (jobId) => {
    setJobsList((prev) =>
      prev.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job))
    )
  }

  const toggleFilter = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }))
  }

  const clearFilters = () => {
    setFilters({ experience: [], type: [], remote: [] })
  }

  const activeFiltersCount =
    filters.experience.length + filters.type.length + filters.remote.length

  const filteredJobs = jobsList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesLocation =
      !locationQuery || job.location.toLowerCase().includes(locationQuery.toLowerCase())

    const matchesExperience =
      filters.experience.length === 0 || filters.experience.includes(job.experience)

    const matchesType = filters.type.length === 0 || filters.type.includes(job.type)

    const matchesRemote = filters.remote.length === 0 || filters.remote.includes(job.remote)

    return matchesSearch && matchesLocation && matchesExperience && matchesType && matchesRemote
  })

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.match - a.match
      case 'recent':
        return 0 // Would sort by date in real app
      case 'salary':
        return 0 // Would parse and sort by salary
      default:
        return 0
    }
  })

  const FilterContent = () => (
    <div className=" flex flex-col space-y-6 overflow-hidden">

      {/* Experience Level */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-foreground">Experience Level</h4>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox
                id={`exp-${level}`}
                checked={filters.experience.includes(level)}
                onCheckedChange={() => toggleFilter('experience', level)}
              />
              <Label htmlFor={`exp-${level}`} className="text-sm text-muted-foreground">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Job Type */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-foreground">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={filters.type.includes(type)}
                onCheckedChange={() => toggleFilter('type', type)}
              />
              <Label htmlFor={`type-${type}`} className="text-sm text-muted-foreground">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Remote Options */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-foreground">Work Location</h4>
        <div className="space-y-2">
          {remoteOptions.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`remote-${option}`}
                checked={filters.remote.includes(option)}
                onCheckedChange={() => toggleFilter('remote', option)}
              />
              <Label htmlFor={`remote-${option}`} className="text-sm text-muted-foreground">
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <>
          <Separator />
          <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
            Clear All Filters
          </Button>
        </>
      )}
    </div>
  )

  return (
    <div className="flex flex-col space-y-6">


      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Job Listings</h1>
        <p className="text-muted-foreground">Discover opportunities matched to your skills</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative flex-1 sm:max-w-[200px]">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Location..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="sm:hidden bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0">{activeFiltersCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your job search</SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.experience.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button onClick={() => toggleFilter('experience', filter)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.type.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button onClick={() => toggleFilter('type', filter)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.remote.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1">
              {filter}
              <button onClick={() => toggleFilter('remote', filter)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar Filters (Desktop) */}
        <Card className="hidden w-64 shrink-0 border-border lg:block">
          <CardContent className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Filters</h3>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary">{activeFiltersCount}</Badge>
              )}
            </div>
            <FilterContent />
          </CardContent>
        </Card>

        {/* Job List */}
        <div className="flex-1 space-y-4">
          {/* Sort and Count */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {sortedJobs.length} job{sortedJobs.length !== 1 ? 's' : ''} found
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Cards */}
          {sortedJobs.length > 0 ? (
            <div className="space-y-4">
              {sortedJobs.map((job) => (
                <Card key={job.id} className="border-border transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                          <Building2 className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <Link
                            to={`/candidate/jobs/${job.id}`}
                            className="text-lg font-semibold text-foreground hover:text-primary"
                          >
                            {job.title}
                          </Link>
                          <p className="text-muted-foreground">{job.company}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {job.salary}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {job.posted}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-primary/20 text-primary">{job.match}% Match</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSaved(job.id)}
                          className={cn(job.saved && 'text-primary')}
                        >
                          {job.saved ? (
                            <BookmarkCheck className="h-5 w-5" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                          <span className="sr-only">{job.saved ? 'Unsave' : 'Save'} job</span>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline">{job.remote}</Badge>
                      <Badge variant="outline">{job.experience}</Badge>
                      {job.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 4 && (
                        <Badge variant="secondary">+{job.skills.length - 4}</Badge>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <Button asChild>
                        <Link to={`/candidate/jobs/${job.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link to={`/candidate/jobs/${job.id}/apply`}>Quick Apply</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-lg font-medium text-foreground">No jobs found</p>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
