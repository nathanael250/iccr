import Image from 'next/image'
import Link from 'next/link'
import {
  Gift,
  Heart,
  Users,
} from 'lucide-react'

import operationJosephVideo from '@/src/assets/AQOONmpIdm1onz8XuNbdZeqcnQT0wqpRoV_y3js5j-R00N8GThdajryJOM-PFq6PERmYNVvjxufZOvbfHyFjvj0VzR_BRD3WgF1nJdh-CyDJrA.mp4'
import charityStoryImage from '@/src/assets/charity story/image.png'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'Charity & Outreach - Impact For Christ Church In Rwanda',
  description:
    'Learn about Operation Joseph Rwanda and how Impact For Christ Ministries is demonstrating the love of Christ through charity and outreach.',
}

const storyPillars = [
  {
    title: 'Remembering the needy',
    description:
      'Operation Joseph Rwanda exists to ensure that vulnerable people are not forgotten, but are seen, prayed for, and supported with compassion.',
    icon: Heart,
  },
  {
    title: 'Lifting families from poverty',
    description:
      'The mission is not only to respond to immediate needs, but to help people reclaim dignity and move toward sustainable lives.',
    icon: Users,
  },
  {
    title: 'Practical love in action',
    description:
      'Prayer, essential items, giving, and partnership all work together as visible expressions of the love of Jesus Christ.',
    icon: Gift,
  },
]

export default function Charity() {
  return (
    <div className="w-full">
      <section className="bg-background px-4 py-10 sm:py-14">
        <div className="container mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl space-y-5">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Charity & Outreach
                <span className="h-px w-6 bg-primary" />
              </div>
              <h1 className="mt-3 text-4xl font-bold text-balance text-foreground sm:text-5xl">
                Operation Joseph Rwanda
              </h1>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-sm">
              <div className="aspect-video bg-slate-950">
                <video
                  className="h-full w-full object-cover"
                  src={operationJosephVideo}
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
              <div className="rounded-[28px] border border-primary/15 bg-white p-6 shadow-sm sm:p-8 lg:flex lg:flex-col lg:justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  A Ray of Hope, A Hand of Love
                </div>

                <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 p-5">
                  <p className="text-lg font-semibold leading-8 text-foreground">
                    "Fear not, for I will provide for you and your little ones."
                  </p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
                    Genesis 50:21
                  </p>
                </div>

                <div className="mt-6 space-y-5 text-lg leading-8 text-muted-foreground">
                  <p>
                    When kindness flows, hearts revive. Together, we help dreams
                    survive. For those in need, we pave the way out of poverty
                    and towards a brighter day.
                  </p>
                  <p>
                    At Operation Joseph Rwanda, our mission is clear: to lift
                    the poor out of poverty, empowering them to reclaim dignity
                    and build sustainable lives.
                  </p>
                  <p>
                    Through your support, we can weave a future filled with hope
                    and opportunity.
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-border/70 bg-card shadow-sm">
                <div className="relative h-full min-h-[360px] bg-white p-4 sm:min-h-[420px]">
                  <Image
                    src={charityStoryImage}
                    alt="Operation Joseph Rwanda charity story"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-10 sm:py-14">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-border/70 bg-white p-6 shadow-sm sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Story of Impact
              </div>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                Christ&apos;s love in action
              </h2>
              <div className="mt-6 space-y-5 text-lg leading-8 text-muted-foreground">
                <p>
                  Operation Joseph in Rwanda, a branch of Impact for Christ
                  Ministries, demonstrated the love of Christ by remembering
                  the needy.
                </p>
                <p>
                  As part of this outreach, the OPJ team in Rwanda visited the
                  University Teaching Hospital of Kigali. They went there not
                  only to see those in need, but to stand with them in prayer
                  and to bless them with essential items.
                </p>
                <p>
                  This outreach reflects the heart of the ministry: to bring
                  both spiritual encouragement and practical support, so that
                  people encounter the compassion of Jesus Christ in real and
                  meaningful ways.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {storyPillars.map((pillar) => {
                const Icon = pillar.icon

                return (
                  <Card key={pillar.title} className="border-border/70 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Icon className="h-5 w-5 text-primary" />
                        {pillar.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-7 text-muted-foreground">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="rounded-[28px] border border-border/70 bg-white p-6 shadow-sm sm:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Join This Divine Initiative
              </div>
              <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
                Be part of restoring dignity
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Together, we can transform lives, helping families rise above
                challenges and breaking the chains of poverty. Every act of
                generosity becomes light in someone&apos;s darkness.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2" id="operation-joseph-giving">
              <Card className="border-primary/15 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-3xl text-primary">
                    Operation Joseph Giving Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 text-base leading-8 text-muted-foreground">
                  <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 text-sm leading-7">
                    <p className="font-semibold text-foreground">
                      These details are for Operation Joseph Rwanda only.
                    </p>
                    <p className="mt-1">
                      Church tithes, offerings, and general church giving use
                      separate Impact For Christ Church In Rwanda codes on the
                      Give page.
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">BPR Bank Rwanda</p>
                    <p>USD Account: 4492634940</p>
                    <p>FRW Account: 4492634916</p>
                    <p>Account Name: Operation Joseph</p>
                    <p>SWIFT Code: BPRWRWRW</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-foreground">Mobile Money</p>
                    <p>*182*8*1*100546# (Operation Joseph C Ltd)</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/70 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-3xl">Ways to Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button asChild size="lg" className="h-12 w-full bg-primary text-base hover:bg-primary/90">
                    <Link href="#operation-joseph-giving">Support Operation Joseph</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 w-full text-base">
                    <Link href="/give">Church Tithes & Offerings</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 w-full text-base">
                    <Link href="/contact">Volunteer With Us</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12 w-full text-base">
                    <Link href="/contact">Partner in Outreach</Link>
                  </Button>
                  <p className="pt-2 text-sm leading-7 text-muted-foreground">
                    For direct contact: <a href="mailto:operationjosephrwanda@gmail.com" className="font-medium text-primary transition hover:text-primary/80">operationjosephrwanda@gmail.com</a> | <a href="tel:+250788304392" className="font-medium text-primary transition hover:text-primary/80">+250 788 304 392</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111827] px-4 py-16 text-white sm:py-20">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-balance">
            Together, We Can Transform Lives
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
            Help families rise above challenges and break the chains of
            poverty. Be the light in someone&apos;s darkness through giving,
            prayer, and partnership with Operation Joseph Rwanda.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="#operation-joseph-giving">Support This Work</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground"
            >
              <Link href="/give">Church Giving Details</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
