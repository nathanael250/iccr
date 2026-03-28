import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MonitorPlay,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import eventFlyer from '../../src/assets/event/image.png'

export const metadata = {
  title: 'Events - Impact For Christ Church In Rwanda',
  description:
    'Discover the current upcoming church event at Impact For Christ Church In Rwanda.',
}

const upcomingEvent = {
  name: 'Youth Online Seminar',
  subtitle: 'Part Three',
  date: 'Sunday 29 March 2026',
  time: '5:30 PM',
  timeAlt: '17:30',
  location: 'Google Meet',
  host: 'Pastor Brigitte',
  description:
    "Theme: How To Live The Christian Way In Today's World - Part Three.",
  category: 'Upcoming Event',
  image: eventFlyer,
  meetLink: 'https://meet.google.com/kxv-yvzx-kgh',
  featured: true,
}

export default function Events() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden px-4 py-16 text-white sm:py-24">
        <Image
          src="/image.png"
          alt="Impact For Christ Church events background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.5),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.32),transparent_30%)]" />

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Church Events
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-balance sm:text-5xl lg:text-6xl">
                Gather, worship, and grow together through every season.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
                Stay connected with the current upcoming event from Impact For
                Christ Church In Rwanda.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {['Youth', 'Online', 'Teaching'].map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Upcoming Event
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                {upcomingEvent.name}
              </h2>
              <p className="mt-3 text-white/75">{upcomingEvent.description}</p>

              <div className="mt-5 space-y-3">
                {[
                  { icon: CalendarDays, text: upcomingEvent.date },
                  { icon: Clock3, text: `${upcomingEvent.time} / ${upcomingEvent.timeAlt}` },
                  { icon: MonitorPlay, text: upcomingEvent.location },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/90">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <a href={upcomingEvent.meetLink} target="_blank" rel="noreferrer">
                  Join On Google Meet
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Upcoming Event
              <span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Current Church Program
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              We currently have one featured upcoming event on the calendar.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <div className="group overflow-hidden rounded-2xl border border-primary/20 bg-white shadow-lg shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="border-b border-border bg-slate-100 p-4">
                <div className="relative aspect-[1080/720] overflow-hidden rounded-[20px] bg-white">
                  <Image
                    src={upcomingEvent.image}
                    alt={upcomingEvent.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {upcomingEvent.category}
                    </span>
                    {upcomingEvent.featured ? (
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-2xl font-bold leading-snug text-foreground">
                    {upcomingEvent.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    {upcomingEvent.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Hosted by {upcomingEvent.host}. {upcomingEvent.description}
                  </p>
                </div>

                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarDays className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium text-foreground">
                      {upcomingEvent.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock3 className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium text-foreground">
                      {upcomingEvent.time} / {upcomingEvent.timeAlt}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MonitorPlay className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="font-medium text-foreground">
                      {upcomingEvent.location}
                    </span>
                  </div>
                </div>

                <a
                  href={upcomingEvent.meetLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Join Event
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="h-1 w-full bg-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:py-20">
        <div className="container mx-auto max-w-5xl">
          <Card className="border-border/70 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-foreground">
                Need Help Joining?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl leading-8 text-muted-foreground">
                If you need help accessing the seminar or want more information
                about church events, contact the church team.
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/contact">Contact The Church</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
