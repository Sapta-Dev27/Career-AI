import { Link } from 'react-router-dom'
import {
  Sparkles,
  FileText,
  MessageSquare,
  Mic,
  Briefcase,
  TrendingUp,
  Users,
  ArrowRight,
  Check,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: MessageSquare,
    title: 'AI Career Guidance',
    description: 'Get personalized career advice powered by advanced AI that understands your goals and experience.',
  },
  {
    icon: FileText,
    title: 'Smart Resume Builder',
    description: 'Create ATS-optimized resumes with AI suggestions that highlight your strengths.',
  },
  {
    icon: Mic,
    title: 'Interview Preparation',
    description: 'Practice with AI-powered mock interviews and receive instant feedback to improve.',
  },
  {
    icon: Briefcase,
    title: 'Job Matching',
    description: 'Discover opportunities tailored to your skills and career aspirations.',
  },
  {
    icon: TrendingUp,
    title: 'Career Insights',
    description: 'Stay ahead with industry trends, salary data, and skill recommendations.',
  },
  {
    icon: Users,
    title: 'For Recruiters',
    description: 'Streamline hiring with powerful job posting and applicant management tools.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Create Your Profile',
    description: 'Sign up and tell us about your career goals, skills, and experience.',
  },
  {
    step: '02',
    title: 'Get AI Guidance',
    description: 'Receive personalized recommendations and build your career toolkit.',
  },
  {
    step: '03',
    title: 'Land Your Dream Job',
    description: 'Apply with confidence using AI-optimized resumes and interview prep.',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    company: 'TechCorp',
    content: 'The AI career guidance helped me transition from frontend to full-stack development. The resume builder was a game changer!',
    rating: 5,
  },
  {
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    company: 'StartupXYZ',
    content: 'Interview prep feature gave me the confidence I needed. I aced my interviews and landed a 40% salary increase.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'HR Director',
    company: 'Enterprise Inc',
    content: 'As a recruiter, the applicant management tools have streamlined our hiring process significantly.',
    rating: 5,
  },
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['Basic AI career guidance', '1 resume template', '5 mock interview questions', 'Job search access'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For serious job seekers',
    features: [
      'Unlimited AI guidance',
      'All resume templates',
      'Unlimited mock interviews',
      'Cover letter generator',
      'Priority support',
      'Advanced analytics',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For teams and recruiters',
    features: [
      'Everything in Pro',
      'Team management',
      'Bulk job posting',
      'Applicant tracking',
      'Custom integrations',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
]

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Career Growth</span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Intelligent Career
            <span className="block text-primary">Companion</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Navigate your career journey with AI-powered guidance. Build stunning resumes, ace interviews, 
            and discover opportunities tailored to your unique potential.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link to="/register">
                Start Free Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">50K+</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Jobs Landed</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">4.9</p>
              <p className="text-sm text-muted-foreground">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Powerful AI tools designed to accelerate your career growth at every stage.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Get started in minutes and transform your career journey.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {steps.map((item, index) => (
              <div key={item.step} className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
                )}
                <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Loved by Professionals
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              See how CareerAI is helping thousands advance their careers.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-border bg-card">
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-card-foreground">{testimonial.content}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose the plan that fits your career stage. Upgrade or downgrade anytime.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative border-border ${
                  plan.highlighted ? 'border-2 border-primary shadow-lg' : 'bg-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-card-foreground">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-8 w-full"
                    variant={plan.highlighted ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/register">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Transform Your Career?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Join thousands of professionals who have accelerated their career growth with CareerAI.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
