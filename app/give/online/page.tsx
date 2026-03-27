import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export const metadata = {
  title: 'Online Giving - Impact For Christ Church In Rwanda',
  description:
    'Complete your donation online and support the ministry work of Impact For Christ Church In Rwanda.',
}

export default function OnlineGivingPage() {
  return (
    <div className="w-full bg-background">
      <section className="relative overflow-hidden px-4 py-16 text-white sm:py-20">
        <img
          src="/image.png"
          alt="Impact For Christ Church worship background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.55),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(235,95,39,0.35),transparent_30%)]" />

        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
            Online Giving
          </div>
          <h1 className="mt-5 text-4xl font-bold text-balance sm:text-5xl">
            Complete your giving online
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
            Use this page to prepare your donation details before proceeding
            with payment. Your giving supports ministry, outreach, and practical
            impact in Rwanda.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.05fr)_380px]">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl">Donation Details</CardTitle>
              <p className="text-base leading-7 text-muted-foreground">
                Fill in the information below to continue to the secure online
                payment step.
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input id="full-name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-address">Email Address</Label>
                  <Input
                    id="email-address"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount</Label>
                  <Input id="amount" placeholder="e.g 50,000 RWF or 100 USD" />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Giving Purpose</Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'General Offering',
                    'Tithe',
                    'Church Project',
                    'Charity & Outreach',
                    'Special Seed',
                    'Thanksgiving',
                  ].map((item, index) => (
                    <label
                      key={item}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground transition hover:border-primary/40 hover:bg-primary/5"
                    >
                      <input
                        type="radio"
                        name="giving-purpose"
                        defaultChecked={index === 0}
                        className="h-4 w-4 accent-[#EB5F27]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Church Offering Codes</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    '*182*8*1*512347#',
                    '*182*8*1*100545#',
                  ].map((code) => (
                    <div
                      key={code}
                      className="rounded-3xl border border-primary/15 bg-primary/5 p-5"
                    >
                      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        Church Code
                      </p>
                      <p className="mt-3 text-xl font-semibold text-foreground">
                        {code}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        IMPACT FOR CHRIST CHURCH IN RWANDA
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Prayer or Giving Note</Label>
                <Textarea
                  id="note"
                  placeholder="Add a short note, prayer request, or payment reference if needed."
                  className="min-h-[130px]"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  className="min-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Proceed to Secure Payment
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/give">Back to Give Page</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-primary/15 bg-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Secure Giving
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Use this page to prepare church giving information before
                  completing your mobile money offering with the church codes.
                </p>
                <p>
                  The church offering codes are `*182*8*1*512347#` and
                  `*182*8*1*100545#`, both named Impact For Christ Church In
                  Rwanda.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Giving Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
                <p>
                  Need help completing your church donation? Reach out to the church
                  office and our team will guide you.
                </p>
                <p className="font-medium text-foreground">
                  impactforchristrwanda@gmail.com
                </p>
                <Button asChild className="mt-2 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
