import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getProjectBySlug } from '@/app/projects/data'

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="bg-background px-4 py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-foreground">Project Not Found</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The project you are looking for could not be found.
          </p>
          <Button asChild className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/projects">Back to Projects</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <section className="relative overflow-hidden px-4 py-16 text-white sm:py-24">
        <Image src={project.image} alt={project.name} fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-slate-950/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.48),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.28),transparent_30%)]" />

        <div className="container relative z-10 mx-auto max-w-5xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-8 max-w-3xl space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                {project.category}
              </span>
              <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                {project.status}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-balance sm:text-5xl">{project.name}</h1>
            <p className="flex items-center gap-2 text-white/80">
              <MapPin className="h-4 w-4" />
              {project.location}
            </p>
            <p className="text-lg leading-8 text-white/85">{project.summary}</p>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="space-y-8">
              <Card className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Project Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-8 text-muted-foreground">{project.overview}</p>
                  <p className="leading-8 text-muted-foreground">{project.details}</p>
                </CardContent>
              </Card>

              <Card className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Key Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.highlights.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Project Objectives</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.objectives.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <p className="text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-primary/15 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Impact Snapshot</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-8 text-muted-foreground">{project.impact}</p>
                </CardContent>
              </Card>

              <Card className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Category</p>
                    <p className="mt-1 text-foreground">{project.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Status</p>
                    <p className="mt-1 text-foreground">{project.status}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">Location</p>
                    <p className="mt-1 text-foreground">{project.location}</p>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-3xl bg-[#111827] p-6 text-white shadow-lg">
                <h2 className="text-2xl font-semibold">Support This Project</h2>
                <p className="mt-3 leading-7 text-white/75">
                  If you would like to partner, volunteer, or give toward this work, contact the church and let us know how you want to be involved.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/contact">Contact The Church</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground">
                    <Link href="/charity">Support Our Work</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
