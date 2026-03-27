import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Events - Impact For Christ Church In Rwanda',
  description:
    'Discover regular gatherings, worship services, and special church events at Impact For Christ Church In Rwanda.',
}

const regularEvents = [
  {
    name: 'Sunday Worship Service',
    time: '7:00 AM - 3:00 PM',
    day: 'Every Sunday',
    location: 'Main Sanctuary',
    description:
      'Join us for our weekly worship service featuring inspiring messages, prayer, and fellowship.',
    category: 'Worship',
    image: '/image.png',
    featured: true,
  },
  {
    name: 'Youth Fellowship',
    time: '3:00 PM - 5:00 PM',
    day: 'Every Saturday',
    location: 'Youth Center',
    description:
      'Connect with young believers through Bible study, games, and meaningful discussions.',
    category: 'Youth',
    image: '/pexels-andrew-degarde-148550826-29422234.jpg',
  },
  {
    name: 'Prayer Meeting',
    time: '7:00 PM - 8:30 PM',
    day: 'Every Wednesday',
    location: 'Prayer Room',
    description:
      'Dedicated time for intercessory prayer for our community, nation, and world.',
    category: 'Prayer',
    image: '/image.png',
  },
  {
    name: "Women's Ministry",
    time: '2:00 PM - 4:00 PM',
    day: 'First Saturday',
    location: "Women's Hall",
    description:
      'Women gathering for worship, learning, and building sisterhood in Christ.',
    category: 'Ministry',
    image: '/pexels-andrew-degarde-148550826-29422234.jpg',
  },
  {
    name: "Men's Breakfast & Study",
    time: '7:00 AM - 9:00 AM',
    day: 'First Saturday',
    location: 'Fellowship Hall',
    description:
      'Men gathering for breakfast, Bible study, and accountability in faith.',
    category: 'Ministry',
    image: '/image.png',
  },
  {
    name: 'Community Outreach',
    time: '9:00 AM - 1:00 PM',
    day: 'Second Sunday',
    location: 'Various Locations',
    description:
      'Serve our community through charity work, outreach programs, and community service.',
    category: 'Community',
    image: '/pexels-andrew-degarde-148550826-29422234.jpg',
  },
]

const specialEvents = [
  {
    name: 'Christmas Celebration',
    description:
      'Join us for special services and celebrations honoring the birth of Christ.',
    date: 'December',
  },
  {
    name: 'Easter Services',
    description:
      'Commemorate the resurrection of Christ with special worship and communion services.',
    date: 'April',
  },
  {
    name: 'Annual Missions Conference',
    description:
      'Inspiring messages and fellowship focused on global mission and outreach.',
    date: 'September',
  },
  {
    name: 'Youth Camp',
    description:
      'A week-long retreat for youth featuring worship, teaching, and team building.',
    date: 'July',
  },
  {
    name: 'Family Day',
    description:
      'Games, activities, and worship designed for the whole family.',
    date: 'June',
  },
  {
    name: 'Thanksgiving Service',
    description:
      'Express gratitude to God for His blessings with our church community.',
    date: 'November',
  },
]

const categories = ['Worship', 'Youth', 'Prayer', 'Ministry', 'Community']

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
                From weekly services to special church programs, our events are
                designed to help people encounter Christ, build community, and
                serve with purpose.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {categories.map((category) => (
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
                This Week
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white">
                Sunday Worship Service
              </h2>
              <p className="mt-3 text-white/75">
                Our main weekly gathering for worship, the Word, prayer, and
                fellowship as one church family.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  { icon: CalendarDays, text: 'Every Sunday' },
                  { icon: Clock3, text: '7:00 AM - 3:00 PM' },
                  { icon: MapPin, text: 'Main Sanctuary' },
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
                <Link href="/contact">Plan Your Visit</Link>
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
              Regular Events
              <span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Weekly and Monthly Gatherings
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Join us for worship, fellowship, discipleship, prayer, and
              community outreach throughout the month.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {regularEvents.map((event) => (
              <div
                key={event.name}
                className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  event.featured
                    ? 'border-primary/20 shadow-lg shadow-primary/10'
                    : 'border-border shadow-sm'
                }`}
              >
                <div className="relative h-52 overflow-hidden bg-muted">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {event.category}
                  </span>
                  {event.featured && (
                    <span className="absolute top-4 right-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-4 p-6">
                  <div>
                    <h3 className="text-2xl font-bold leading-snug text-foreground">
                      {event.name}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-border pt-4">
                    <div className="flex items-center gap-3 text-sm">
                      <CalendarDays className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="font-medium text-foreground">
                        {event.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock3 className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="font-medium text-foreground">
                        {event.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="font-medium text-foreground">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className={`mt-2 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
                      event.featured
                        ? 'text-primary hover:text-primary/80'
                        : 'text-foreground hover:text-primary'
                    }`}
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {event.featured && <div className="h-1 w-full bg-primary" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Special Programs
              <span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Seasonal and Annual Events
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Throughout the year, we gather for special celebrations,
              conferences, outreach programs, and family-centered moments.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {specialEvents.map((event) => (
              <Card
                key={event.name}
                className="border-border/70 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary">
                    <Sparkles className="h-4 w-4" />
                    {event.date}
                  </div>
                  <CardTitle className="text-2xl leading-snug">
                    {event.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111827] px-4 py-16 text-white sm:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-10">
            <h2 className="text-3xl font-bold text-balance">
              Don&apos;t Miss What&apos;s Coming Next
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
              Stay connected with our church calendar and receive guidance on
              upcoming services, fellowships, outreach programs, and special
              events.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/contact">Subscribe & Stay Updated</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground"
              >
                <Link href="/membership">Join the Family</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
