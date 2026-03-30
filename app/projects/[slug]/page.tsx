import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPublicProjectContent } from '@/lib/public-content'
import { getProjectBySlug } from '@/app/projects/data'

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const [project, setProject] = useState(() => getProjectBySlug(slug) ?? null)
  const galleryImages = project?.images?.length ? project.images : project ? [project.image] : []
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    setProject(getProjectBySlug(slug) ?? null)
    setActiveImageIndex(0)
    setSelectedImageIndex(null)

    getPublicProjectContent(slug).then((record) => {
      if (record) {
        setProject(record)
      }
    })
  }, [slug])

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
      <section className="bg-background px-4 py-12 sm:py-16">
        <div className="container mx-auto max-w-6xl">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Project Gallery
              </p>
              <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                {project.name}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Click any image to view it full size.
            </p>
          </div>

          <div className="mt-8 mx-auto max-w-4xl">
            <button
              type="button"
              onClick={() => setSelectedImageIndex(activeImageIndex)}
              className="group relative block w-full overflow-hidden rounded-[32px] border border-border/70 bg-card shadow-sm"
              aria-label={`Open ${project.name} image ${activeImageIndex + 1} full size`}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9]">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={`${project.name} image ${activeImageIndex + 1}`}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.64))]" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                      Project Image
                    </p>
                    <p className="mt-2 text-lg font-semibold sm:text-xl">
                      {project.name}
                    </p>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    <Expand className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>

            {galleryImages.length > 1 ? (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex(
                      (current) => (current - 1 + galleryImages.length) % galleryImages.length,
                    )
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:border-primary hover:text-primary"
                  aria-label="Show previous project image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveImageIndex((current) => (current + 1) % galleryImages.length)
                  }
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:border-primary hover:text-primary"
                  aria-label="Show next project image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            ) : null}

            <div className="mt-5 flex items-center justify-center gap-3">
              {galleryImages.map((imageSrc, index) => (
                <button
                  key={`${imageSrc}-dot`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-3 rounded-full transition ${
                    activeImageIndex === index
                      ? 'w-8 bg-primary'
                      : 'w-3 bg-border hover:bg-primary/60'
                  }`}
                  aria-label={`Show project image ${index + 1}`}
                />
              ))}
            </div>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Image {activeImageIndex + 1} of {galleryImages.length}
            </p>
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
                  <Button asChild variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/give">Support This Project</Link>
                  </Button>
                  <Button asChild className="border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground">
                    <Link href="/contact">Contact The Church</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedImageIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/92 px-4 py-6"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close full size image"
          >
            <X className="h-5 w-5" />
          </button>

          {galleryImages.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedImageIndex((current) => {
                    const nextIndex =
                      current === null
                        ? 0
                        : (current - 1 + galleryImages.length) % galleryImages.length

                    setActiveImageIndex(nextIndex)
                    return nextIndex
                  })
                }}
                className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  setSelectedImageIndex((current) => {
                    const nextIndex =
                      current === null ? 0 : (current + 1) % galleryImages.length

                    setActiveImageIndex(nextIndex)
                    return nextIndex
                  })
                }}
                className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <div
            className="w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-black shadow-2xl">
              <img
                src={galleryImages[selectedImageIndex]}
                alt={`${project.name} full size image ${selectedImageIndex + 1}`}
                className="max-h-[86vh] w-full object-contain"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-sm text-white/75">
              <p>
                {project.name} image {selectedImageIndex + 1} of {galleryImages.length}
              </p>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="text-white transition hover:text-primary"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
