import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, MapPin, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Church Leadership - Impact For Christ Church In Rwanda',
  description:
    'Learn about the spiritual leadership and church leadership team of Impact For Christ Church In Rwanda.',
}

const ministryLocations = [
  {
    country: 'South Africa',
    cities: ['Johannesburg', 'Durban'],
  },
  {
    country: 'Zambia',
    cities: ['Chipata', 'Lusaka'],
  },
  {
    country: 'DRC',
    cities: ['Kinshasa', 'Lubumbashi', 'Goma'],
  },
  {
    country: 'Rwanda',
    cities: ['Kigali'],
  },
  {
    country: 'Burundi',
    cities: ['Bujumbura'],
  },
]

const leaders = [
  {
    name: 'Apostle Prof. Bizuru Elias',
    role: 'Regional Church Pioneer',
    image: '/apostle-prof-bizuru-elias.jpeg',
    description:
      'Apostle Prof. Elias BIZURU is a servant of God who works under the leadership of Prophet Philip Banda. At the request of the Prophet, he is the one who opened the church in Burundi, in Rwanda, and also in Goma in the DRC.',
  },
  {
    name: 'Pastor Dr NYIRAMBANGUTSE Brigitte',
    role: 'Senior Pastor / General Overseer',
    image: '/pastor-dr-nyirambangutse-brigitte.jpeg',
    description:
      'Pastor Dr. NYIRAMBANGUTSE Brigitte is a servant of God who works under the leadership of Prophet Philip Banda. She serves as the Senior Pastor and General Overseer of Impact for Christ Church in Rwanda and manages the day-to-day life and operations of the church.',
  },
  {
    name: 'Pastor NSENGUMUREMYI GASANA Georges',
    role: 'Legal Representative',
    image: '/pastor-nsengumuremyi-gasana-georges.jpeg',
    description:
      'Pastor NSENGUMUREMYI GASANA Georges serves as the Legal Representative, acting as the primary spokesperson and official representative of the church in legal, administrative, and public affairs matters.',
  },
  {
    name: 'Mr. Jean Eric HARELIMANA',
    role: 'Deputy Legal Representative',
    image: '/jean-eric-harelimana.jpeg',
    description:
      'Mr. Jean Eric HARELIMANA serves as the Deputy Legal Representative, acting as the supporting spokesperson and deputy in the legal, administrative, and public responsibilities of the church.',
  },
]

export default function AboutLeadership() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden px-4 py-16 text-white sm:py-24">
        <Image
          src="/image.png"
          alt="Impact For Christ Church leadership background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.5),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.32),transparent_30%)]" />

        <div className="container relative z-10 mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
              <Users className="h-4 w-4" />
              Church Leadership
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-balance sm:text-5xl">
              Leadership under Prophet Philip Banda
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/85">
              Our church works under spiritual leadership and a team of servants of God who lead with faithfulness, order, humility, and commitment to the work of Christ.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Church Leadership
              <span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Leadership Under Prophet Philip Banda
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              Meet the spiritual leadership and church leadership team serving
              Impact For Christ Church in Rwanda.
            </p>
          </div>

          <Card className="overflow-hidden border-border/70 py-0 shadow-sm">
            <div className="grid lg:grid-cols-[340px_minmax(0,1fr)]">
              <div className="relative min-h-[340px] overflow-hidden bg-slate-100">
                <Image
                  src="/Prophet Philip Banda.png"
                  alt="Prophet Philip Banda"
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="space-y-6 bg-white p-6 sm:p-7 lg:p-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    Founder / Leader
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                      Prophet Philip Banda
                    </h2>
                    <p className="text-lg font-medium text-secondary">
                      Founder and leader of Impact for Christ Ministries (IFCM)
                    </p>
                  </div>
                  <p className="text-base leading-8 text-muted-foreground">
                    Prophet Philip Banda is a Zambian-born Christian founder and leader of Impact for Christ Ministries, based primarily in South Africa and ministering across multiple countries in the region.
                  </p>
                  <p className="text-base leading-7 text-muted-foreground">
                    He is known as a humble servant of God who emphasizes obedience to God, love for people, support for Israel, adoration for the Jewish nation, and a ministry of prophetic teaching, prayer, deliverance, miracle services, and live Sunday broadcasts.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                  <div className="rounded-2xl border border-border/60 bg-background p-5">
                    <div className="mb-4 flex items-center gap-2 text-foreground">
                      <MapPin className="h-4 w-4 text-primary" />
                      <p className="font-semibold">Ministry Locations</p>
                    </div>
                    <div className="space-y-3">
                      {ministryLocations.map((location) => (
                        <div key={location.country} className="space-y-2">
                          <p className="font-medium text-foreground">{location.country}</p>
                          <div className="flex flex-wrap gap-2">
                            {location.cities.map((city) => (
                              <span
                                key={`${location.country}-${city}`}
                                className="rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary"
                              >
                                {city}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <p className="text-sm leading-6 text-muted-foreground">
                        ...and other locations where ministry is carried out.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/60 bg-background p-5">
                    <div className="mb-4 flex items-center gap-2 text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <p className="font-semibold">Leadership Emphasis</p>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Obedience to God',
                        'Love for people',
                        'Support for Israel',
                        'Adoration for the Jewish nation',
                        'Prophetic teaching and prayer',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                          <p className="text-muted-foreground">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            {leaders.map((leader) => (
              <Card
                key={leader.name}
                className="overflow-hidden border-border/70 py-0 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <CardHeader className="pb-0">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
                    {leader.role}
                  </p>
                  <CardTitle className="text-2xl leading-tight">
                    {leader.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-7 text-muted-foreground">
                    {leader.description}
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
            <h3 className="text-3xl font-bold text-balance">
              Connect With Our Church Leadership
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
              Learn more about our church, contact the team, or plan a visit to
              Impact For Christ Church in Rwanda.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/about">About The Church</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
