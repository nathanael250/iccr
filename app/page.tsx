import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CalendarDays,
  Globe,
  Heart,
  MapPin,
  Users,
  Zap,
} from "lucide-react";

export default function Home() {
  const upcomingEvents = [
    {
      id: 1,
      image: "/image.png",
      category: "Worship",
      title: "Sunday Worship Service",
      schedule: "Every Sunday, 7:00 AM - 3:00 PM",
      description:
        "Join us for our weekly worship service where we gather as a community to glorify God.",
      cta: "Learn More",
      href: "/events",
    },
    {
      id: 2,
      image: "/pexels-andrew-degarde-148550826-29422234.jpg",
      category: "Youth",
      title: "Youth Fellowship",
      schedule: "Saturdays at 3:00 PM",
      description:
        "Connect with other young believers and grow in your faith through meaningful activities.",
      cta: "Learn More",
      href: "/events",
      featured: true,
    },
    {
      id: 3,
      image: "/image.png",
      category: "Outreach",
      title: "Community Outreach",
      schedule: "Monthly initiatives",
      description:
        "Serve alongside our church family in meeting the needs of our community.",
      cta: "Get Involved",
      href: "/charity",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5.5rem)] flex items-center overflow-hidden bg-gray-950">
        {/* Background image with dark overlay */}
        <Image
          src="/image.png"
          alt="Impact For Christ Church In Rwanda worship background"
          fill
          priority
          className="object-cover object-center hero-bg-drift"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-24 grid lg:grid-cols-[minmax(460px,1fr)_minmax(0,1fr)] gap-8 items-center">
          {/* Left column — hero graphic */}
          <div className="hidden lg:flex justify-start self-stretch hero-fade-up hero-delay-5 lg:order-1">
            <div className="hero-card-float flex w-full max-w-[820px] items-stretch">
              <div className="relative min-h-[700px] w-full overflow-hidden rounded-[24px] shadow-2xl shadow-slate-950/35">
                <Image
                  src="/Untitled-2.png"
                  alt="Impact For Christ Church hero graphic"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>

          {/* Left column — main message */}
          <div className="flex flex-col gap-6 lg:order-2">
            {/* Tag */}
            <span className="hero-fade-up hero-delay-1 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.24em] uppercase text-primary">
              <span className="w-6 h-px bg-primary" />
              Welcome to IFCCR
            </span>

            {/* Headline */}
            <h1 className="hero-fade-up hero-delay-2 text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[0.95]">
              Impact For Christ <br />
              <span className="text-primary">Church In Rwanda</span>
            </h1>

            {/* Tagline */}
            <p className="hero-fade-up hero-delay-3 text-gray-200 text-xl max-w-xl leading-relaxed">
              A Christ-centered church family raising faith, compassion, and
              practical impact across Rwanda.
            </p>

            {/* Scripture */}
            <div className="hero-fade-up hero-delay-4 border-l-2 border-primary pl-4">
              <p className="text-sm font-semibold tracking-[0.24em] uppercase text-primary mb-1">
                John 14:12
              </p>
              <p className="text-gray-200 text-base italic leading-relaxed max-w-xl">
                "Most assuredly, I say to you, he who believes in Me, the works that I do he will do also; and greater works than these he will do, because I go to My Father."
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-fade-up hero-delay-5 flex flex-wrap gap-3 mt-2">
              <Link
                href="/about"
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
              >
                Learn More
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 transition-colors duration-200"
              >
                Upcoming Events
              </Link>
              <Link
                href="/give"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 transition-colors duration-200"
              >
                Give Today
              </Link>
            </div>

            {/* Pillars */}
            <div className="hero-fade-up hero-delay-6 flex gap-6 mt-4 pt-6 border-t border-white/10">
              {[
                { label: "Worship", sub: "Faith-filled gatherings" },
                { label: "Community", sub: "Growing together" },
                { label: "Impact", sub: "Serving Rwanda" },
              ].map(({ label, sub }) => (
                <div key={label}>
                  <p className="text-primary text-sm font-semibold tracking-[0.22em] uppercase">
                    {label}
                  </p>
                  <p className="text-white text-base font-medium mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* <section className="relative isolate overflow-hidden px-4">
        <Image
          src="/image.png"
          alt="Impact For Christ Church In Rwanda worship background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.6),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.4),transparent_32%)]" />

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-5 py-6 sm:gap-6 sm:py-8 lg:min-h-[calc(100vh-5.5rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,400px)] lg:items-center lg:gap-8 lg:py-6">
            <div className="max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
                Welcome to ICCR
              </div>

              <img
                src="/logo.png"
                alt="IFCM Logo"
                className="mt-3 h-14 w-auto drop-shadow-xl sm:h-20"
              />

              <h1 className="mt-3 text-3xl font-bold leading-[0.95] text-balance sm:mt-4 sm:text-5xl lg:text-6xl">
                Impact For Christ Church In Rwanda
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-white/85 sm:mt-4 sm:text-lg">
                A Christ-centered church family raising faith, compassion, and
                practical impact across Rwanda.
              </p>

              <div className="mt-4 max-w-2xl rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
                  John 14:12
                </p>
                <p className="mt-2 text-sm italic leading-6 text-white/80 sm:text-base">
                  12 Very truly I tell you, whoever believes in me will do the
                  works I have been doing, and they will do even greater things
                  than these, because I am going to the Father.
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:mt-5 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:border-white hover:bg-white hover:text-foreground"
                >
                  <Link href="/events">Upcoming Events</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Link href="/give">Give Today</Link>
                </Button>
              </div>

              <div className="mt-5 hidden gap-3 md:grid md:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Worship
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    Faith-filled gatherings
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Community
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    Growing together in Christ
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/60">
                    Impact
                  </p>
                  <p className="mt-1 text-base font-semibold">
                    Serving Rwanda with love
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:justify-self-end">
              <div className="rounded-[28px] border border-white/15 bg-white/10 p-5 text-white shadow-2xl shadow-slate-950/40 backdrop-blur-md sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                  Gather With Us
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-balance sm:text-3xl">
                  A welcoming church rooted in prayer, fellowship, and outreach.
                </h2>
                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <CalendarDays className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        Weekly Worship & Fellowship
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white/70">
                        Join our church family for worship, prayer, teaching,
                        and encouragement.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Kigali, Rwanda</p>
                      <p className="mt-1 text-sm leading-6 text-white/70">
                        Reaching people in our city with the love of Christ and
                        practical support.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/10 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary">
                      <Heart className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">Open Hearts, Open Hands</p>
                      <p className="mt-1 text-sm leading-6 text-white/70">
                        Discover a place to belong, grow in faith, and
                        participate in meaningful outreach.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/contact"
                    className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-foreground"
                  >
                    Plan Your Visit
                  </Link>
                  <Link
                    href="/membership"
                    className="rounded-2xl border border-primary/40 bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                  >
                    Join the Family
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Sections */}
      <section className="py-14 sm:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 sm:mb-12 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              Areas of impact
              <span className="h-px w-6 bg-primary" />
            </span>
            
            <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-foreground">
              How We Serve Through Ministry
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-base sm:text-lg leading-7 text-muted-foreground">
              Discover the key areas where Impact For Christ Church in Rwanda is
              serving people with compassion, faith, and practical support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {/* Card 1: Charity */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Charity</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
                  Serving those in need through compassionate outreach and
                  community support programs.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 2: Community */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
                  Growing together in faith, fellowship, and spiritual growth as
                  one body in Christ.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 3: Global Impact */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Global Impact</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
                  Extending Christ's message of hope and transformation across
                  Rwanda and beyond.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Card 4: Projects */}
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Projects</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
                <CardDescription className="text-sm leading-6 sm:text-base sm:leading-7">
                  Making a tangible difference through strategic initiatives and
                  partnerships.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-balance">
              Join Us on Our Mission
            </h2>
            <p className="text-lg opacity-90 max-w-2xl">
              Whether you're looking to learn more, get involved, or support our
              work, there are many ways to be part of Impact For Christ Church
              In Rwanda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/membership">Become a Member</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-white text-secondary shadow-lg shadow-slate-900/10 hover:bg-white/90 hover:text-secondary"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Preview */}
      <section className="bg-muted/40 py-16 px-4 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center sm:mb-14">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-6 bg-primary" />
              What's On
              <span className="h-px w-6 bg-primary" />
            </span>
            <h2 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
              Upcoming Events
            </h2>
            <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground">
              Join us for worship, fellowship, and spiritual growth
              opportunities throughout the year.
            </p>
          </div>

          <div className="grid items-start gap-6 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  event.featured
                    ? "border-primary/20 shadow-lg shadow-primary/10"
                    : "border-border shadow-sm"
                }`}
              >
                {event.featured && (
                  <div className="absolute top-4 right-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Featured
                  </div>
                )}

                <div className="relative h-48 overflow-hidden bg-muted">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>

                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {event.schedule}
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-foreground">
                    {event.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>

                  <Link
                    href={event.href}
                    className={`mt-2 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${
                      event.featured
                        ? "text-primary hover:text-primary/80"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {event.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {event.featured && <div className="h-1 w-full bg-primary" />}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-8 py-3 text-sm font-semibold text-secondary-foreground transition-colors duration-200 hover:bg-primary"
            >
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
