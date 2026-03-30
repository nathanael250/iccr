import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { projects as fallbackProjects, type Project } from '@/app/projects/data'
import { getPublicProjectsContent } from '@/lib/public-content'

export const metadata = {
  title: 'Projects - Impact For Christ Church In Rwanda',
  description:
    'Explore the Kingdom Impact Center vision and the long-term project plans of Impact For Christ Church In Rwanda.',
}

function formatCurrency(value?: number, suffix = '') {
  if (!value) return ''

  return `$${new Intl.NumberFormat('en-US').format(value)}${suffix}`
}

function hasFundingData(goal?: number, raised?: number) {
  return typeof goal === 'number' && typeof raised === 'number'
}

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes('planning')) {
    return 'bg-secondary/12 text-secondary'
  }

  if (normalized.includes('active') || normalized.includes('ongoing')) {
    return 'bg-primary/12 text-primary'
  }

  return 'bg-secondary/12 text-secondary'
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects)

  useEffect(() => {
    getPublicProjectsContent().then(setProjects)
  }, [])

  return (
    <div className="w-full">
      <section className="bg-secondary py-16 text-secondary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Project</h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-secondary-foreground/80">
            Presenting the Kingdom Impact Center vision for Impact For Christ
            Church In Rwanda
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl text-secondary">A Landmark Vision</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Our current project focus is the Kingdom Impact Center, a
            large-scale worship, hospitality, and community hub designed to
            serve the church, host national and international gatherings, and
            create lasting long-term impact in Rwanda.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
              >
                <div>
                  <div className="relative h-[280px] overflow-hidden rounded-lg shadow-lg sm:h-[340px] lg:h-[420px]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Building2 size={28} />
                    </div>
                    <span
                      className={`rounded-full px-4 py-1 text-sm font-medium ${getStatusClasses(
                        project.status,
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-3xl text-secondary">{project.name}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>

                  {hasFundingData(project.goal, project.raised) ? (
                    <div className="mt-6 rounded-lg bg-slate-100 p-6">
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">
                          Goal: {formatCurrency(project.goal, project.goalSuffix)}
                        </span>
                        <span className="text-secondary">
                          Raised: {formatCurrency(project.raised)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 rounded-lg bg-slate-100 p-6 text-sm leading-7 text-muted-foreground">
                      <p className="font-medium text-foreground">
                        Preliminary budget framework
                      </p>
                      <p className="mt-2">
                        The proposal indicates an approximate total investment
                        range of USD 25 million to USD 45 million, pending full
                        feasibility study, valuation, and final design.
                      </p>
                      <p className="mt-2">
                        Estimated upper range: {formatCurrency(project.goal, project.goalSuffix)}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex rounded-lg bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
                    >
                      View Details
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {project.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl">Support This Project</h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-primary-foreground/85">
            Partner with Impact For Christ Church In Rwanda as we pursue the
            Kingdom Impact Center and prepare for long-term ministry and
            community transformation.
          </p>
          <Button
            asChild
            className="mt-8 bg-white px-8 py-3 text-primary hover:bg-slate-100"
          >
            <Link href="/contact">Contact The Church</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
