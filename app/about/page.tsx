import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Heart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
  title: 'About Church - Impact For Christ Church In Rwanda',
  description:
    'Learn who we are, our vision, mission, and what we stand for at Impact For Christ Church In Rwanda.',
}

const standForItems = [
  'Prayer',
  'Intensity of Prayer',
  'High Praise',
  'Strong Godly established relationships',
  'Development and Empowerment of strong leadership',
  'Healing and Deliverance',
  'Release of Apostolic and Prophetic anointing',
  'Breaking of Holy Communion bread',
  'Apostolic liberal giving',
]

export default function About() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden px-4 py-16 text-white sm:py-24">
        <Image
          src="/image.png"
          alt="Impact For Christ Church background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.5),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.32),transparent_30%)]" />

        <div className="container relative z-10 mx-auto max-w-4xl">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
              About Our Church
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-balance sm:text-5xl">
              A church family committed to Christ, compassion, and regional impact.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/85">
              Impact For Christ Church in Rwanda exists to preach Jesus Christ, disciple believers, serve people with love, and raise a faithful church that reflects the works of Christ in Rwanda and beyond.
            </p>
          </div>
        </div>
      </section>

      <section id="about-church" className="scroll-mt-28 bg-background px-4 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-6 bg-primary" />
                Who We Are
              </div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">About The Church</h2>
              <p className="text-lg leading-8 text-muted-foreground">
                Impact for Christ Church in Rwanda is a revelation of the Church of the Lord Jesus Christ, governed by Him as the Head, according to the enunciation of the Holy Scriptures, the working of the Holy Spirit and the ministrations instituted by Jesus Himself.
              </p>
              <p className="text-lg leading-8 text-muted-foreground">
                We are a ministry of the Lord Jesus Christ, where His name is lifted up high and His limitless power demonstrated according to John 14:12 (NKJV), doing the works of Jesus Christ and greater works than He did for those who believe in Him.
              </p>
            </div>

            <div className="grid gap-6">
              <Card className="border-primary/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-8 text-muted-foreground">
                    John 14:12 (NKJV), "Doing the Works of Jesus Christ": "Most assuredly, I say to you, he who believes in Me, the works that I do he will do also; and greater works than these he will do, because I go to My Father."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-secondary">Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-8 text-muted-foreground">
                    To glorify God, to proclaim the Kingdom of God by preaching the Gospel of the Lord Jesus Christ through the power of The Holy Spirit. To minister to the needs of the total person. To develop, equip and release believers into ministry. To extend the influence of the church beyond its boundaries and abroad.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background px-4 py-16 sm:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="max-w-3xl space-y-4 text-center mx-auto">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              What We Stand For
              <span className="h-px w-6 bg-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">What We Stand For</h2>
            <p className="text-lg leading-8 text-muted-foreground">
              The life of Impact for Christ Church in Rwanda is marked by prayer, praise, healing, godly relationships, leadership development, and the release of apostolic and prophetic ministry.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {standForItems.map((item) => (
              <Card key={item} className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="flex items-start gap-3 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-semibold text-foreground">{item}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111827] px-4 py-16 text-white sm:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm sm:p-10">
            <h3 className="text-3xl font-bold text-balance">Ready to Learn More?</h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
              Visit us, join our services, or get involved in one of our ministry opportunities at Impact For Christ Church in Rwanda.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/about/leadership">Meet Our Leadership</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-foreground">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
