import { useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Camera, Images, X } from 'lucide-react'
import {
  fallbackMediaContent,
  getPublicMediaContent,
  type PublicMediaContent,
  type PublicMediaImage,
} from '@/lib/public-content'

export const metadata = {
  title: 'Media - Impact For Christ Church In Rwanda',
  description:
    'Browse the church media gallery from Impact For Christ Church In Rwanda.',
}

export default function Media() {
  const [mediaContent, setMediaContent] = useState<PublicMediaContent>(fallbackMediaContent)
  const [selectedImage, setSelectedImage] = useState<PublicMediaImage | null>(null)

  useEffect(() => {
    getPublicMediaContent().then(setMediaContent)
  }, [])

  const galleryImages = mediaContent.images
  const featuredImages = useMemo(() => galleryImages.slice(0, 3), [galleryImages])
  const gridImages = useMemo(() => galleryImages.slice(3), [galleryImages])

  return (
    <div className="w-full bg-background">
      <section className="relative overflow-hidden px-4 py-16 text-white sm:py-20">
        <img
          src="/image.png"
          alt="Impact For Christ Church worship background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.55),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.35),transparent_28%)]" />

        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
            <Camera className="h-4 w-4 text-primary" />
            Church Gallery
          </div>
          <h1 className="mt-5 text-4xl font-bold text-balance sm:text-5xl">
            Moments of worship, fellowship, and ministry
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
            Explore the media gallery and see highlights from church services,
            gatherings, outreach, and the life of Impact For Christ Church In
            Rwanda.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-[30px] border border-border/70 bg-card p-3 shadow-sm">
              <button
                type="button"
                onClick={() => setSelectedImage(featuredImages[0])}
                className="group relative block h-full min-h-[420px] w-full overflow-hidden rounded-[24px]"
              >
                <img
                  src={featuredImages[0].src}
                  alt={featuredImages[0].alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.05),rgba(15,23,42,0.7))]" />
                <div className="absolute inset-x-5 bottom-5 text-left text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                    Featured Moment
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-balance">
                    Worship and church life captured in one frame
                  </p>
                </div>
              </button>
            </div>

            <div className="grid gap-6">
              {featuredImages.slice(1).map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative min-h-[198px] overflow-hidden rounded-[28px] border border-border/70 bg-card p-3 text-left shadow-sm"
                >
                  <div className="h-full overflow-hidden rounded-[22px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-3 rounded-[22px] bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.58))]" />
                  <div className="absolute inset-x-7 bottom-7 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                      ICCR Media
                    </p>
                    <p className="mt-1 text-lg font-semibold">Church gallery highlight</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[30px] border border-border/70 bg-card px-6 py-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Gallery Collection
              </div>
              <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
                Photo Gallery
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
                A visual collection from worship services, ministry gatherings,
                and moments shared by the church family.
              </p>
            </div>

            <div className="rounded-2xl border border-primary/15 bg-primary/5 px-5 py-4 text-sm leading-7 text-muted-foreground">
              <p className="font-semibold text-foreground">{galleryImages.length} photos</p>
              <p>Click any image to view it larger.</p>
            </div>
          </div>

          {mediaContent.layout === 'sections' && mediaContent.sections.length ? (
            <div className="space-y-10">
              {mediaContent.sections.map((section) => (
                <div key={section.id} className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{section.name}</h3>
                    {section.description ? (
                      <p className="mt-2 max-w-3xl text-base leading-7 text-muted-foreground">
                        {section.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {section.images.map((image) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className="group block overflow-hidden rounded-[26px] border border-border/70 bg-card p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                      >
                        <div
                          className={`overflow-hidden rounded-[20px] ${
                            image.tall ? 'aspect-[4/5]' : 'aspect-[16/10]'
                          }`}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="px-2 pb-1 pt-4">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            {section.name}
                          </p>
                          <p className="mt-1 text-base font-semibold text-foreground">
                            {image.title}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
              {(mediaContent.layout === 'continuous' ? galleryImages : gridImages).map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group mb-5 block w-full break-inside-avoid overflow-hidden rounded-[26px] border border-border/70 bg-card p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className={`overflow-hidden rounded-[20px] ${
                      image.tall ? 'aspect-[4/5]' : 'aspect-[16/10]'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-2 pb-1 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {image.albumName || 'ICCR Media'}
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground">
                      {image.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <div className="rounded-[32px] bg-[#111827] px-6 py-10 text-white sm:px-10 sm:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <Images className="h-4 w-4" />
                More Moments
              </div>
              <h2 className="mt-4 text-3xl font-bold text-balance sm:text-4xl">
                Want to share or request church media?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/75">
                If you need official photos for church communication or want to
                send media from an event, reach out to the church team.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">Contact the Church</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/15 bg-transparent text-white hover:bg-white hover:text-foreground"
                >
                  <Link href="/events">View Events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-8">
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Close gallery preview"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 shadow-2xl">
            <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-h-[78vh] w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-between gap-6 p-6 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    ICCR Gallery
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold">
                    {selectedImage.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">
                    A captured moment from the life and ministry of Impact For
                    Christ Church In Rwanda.
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
