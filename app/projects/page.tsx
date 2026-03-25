import Image from 'next/image'
import Link from 'next/link'
import {
  Building2,
  Droplets,
  GraduationCap,
  HeartHandshake,
  Home,
  Wrench,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { projects } from '@/app/projects/data'

export const metadata = {
  title: 'Projects - Impact For Christ Church In Rwanda',
  description:
    'Discover the impactful projects we are undertaking to serve communities through practical care and Christ-centered compassion.',
}

const iconByCategory = {
  Education: GraduationCap,
  Healthcare: HeartHandshake,
  'Community Care': Home,
  Livelihoods: Wrench,
} as const

function formatCurrency(value?: number, suffix = '') {
  if (!value) return ''

  return `$${new Intl.NumberFormat('en-US').format(value)}${suffix}`
}

function getProgress(goal?: number, raised?: number) {
  if (!goal || !raised) return 0
  return Math.min(100, Math.round((raised / goal) * 100))
}

function getStatusClasses(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes('active') || normalized.includes('ongoing') || normalized.includes('growing')) {
    return 'bg-primary/12 text-primary'
  }

  if (normalized.includes('expanding')) {
    return 'bg-secondary/12 text-secondary'
  }

  return 'bg-secondary/12 text-secondary'
}

export default function Projects() {
  return (
    <div className="w-full">
      <section className="bg-secondary py-16 text-secondary-foreground sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">Our Projects</h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-secondary-foreground/80">
            Making a lasting impact through strategic initiatives and community
            development
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl text-secondary">Transforming Communities</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Our projects are designed to address real needs in our communities,
            from education and healthcare to practical support and livelihoods.
            Each initiative reflects our commitment to doing the works of Jesus
            Christ and creating lasting positive change.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {projects.map((project, index) => {
              const Icon =
                iconByCategory[
                  project.category as keyof typeof iconByCategory
                ] ?? Building2

              const fallbackIcon =
                project.category === 'Community Care' ? Droplets : Icon

              const DisplayIcon =
                project.slug === 'water-and-sanitation' ? Droplets : fallbackIcon

              return (
                <div
                  key={project.slug}
                  className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="relative h-[280px] overflow-hidden rounded-lg shadow-lg sm:h-[340px] lg:h-[400px]">
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
                        <DisplayIcon size={28} />
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

                    <div className="mt-6 rounded-lg bg-slate-100 p-6">
                      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                        <span className="text-muted-foreground">
                          Goal: {formatCurrency(project.goal, project.goalSuffix)}
                        </span>
                        <span className="text-secondary">
                          Raised: {formatCurrency(project.raised)}
                        </span>
                      </div>

                      <div className="h-3 w-full rounded-full bg-slate-200">
                        <div
                          className="h-3 rounded-full bg-primary transition-all"
                          style={{ width: `${getProgress(project.goal, project.raised)}%` }}
                        />
                      </div>
                    </div>

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
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl">Support Our Projects</h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-primary-foreground/85">
            Your contribution helps us bring these life-changing projects to
            completion and impact more communities.
          </p>
          <Button
            asChild
            className="mt-8 bg-white px-8 py-3 text-primary hover:bg-slate-100"
          >
            <Link href="/give">Donate Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
