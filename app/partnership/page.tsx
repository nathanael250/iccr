import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Briefcase, Building2, Handshake, Upload } from 'lucide-react'

export const metadata = {
  title: 'Partnership - Impact For Christ Church In Rwanda',
  description:
    'Partner with Impact For Christ Church In Rwanda to expand ministry impact and outreach.',
}

const partnershipPoints = [
  'We welcome partnerships that align with Christ-centered compassion, integrity, and service.',
  'Our desire is to work with churches, organizations, businesses, and individuals who share a vision for impact.',
  'Partnership can include outreach support, project sponsorship, training, volunteer service, and ministry collaboration.',
  'We value transparency, accountability, and long-term relationships that strengthen the work of God.',
  'Every partnership should contribute to transformed lives, stronger communities, and the advancement of the Gospel.',
]

export default function Partnership() {
  return (
    <div className="w-full bg-background">
      <section className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
          <img
            src="/image.png"
            alt="Impact For Christ Church ministry gathering"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,95,171,0.18),rgba(17,24,39,0.42))]" />
          <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/15 bg-slate-950/45 p-5 text-white backdrop-blur-sm sm:inset-x-8 sm:bottom-8 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Kingdom Partnership
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Work with us to strengthen ministry, outreach, and community impact.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Partnership at ICCR is about building meaningful relationships that
              help extend the love of Christ through practical action, shared
              resources, and faithful collaboration.
            </p>
          </div>
        </div>

        <div className="bg-[#111827] px-4 py-10 text-white sm:px-8 sm:py-12 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Partner With ICCR
            </div>

            <h2 className="mt-5 text-3xl font-bold text-balance sm:text-4xl">
              Explore a strategic partnership with Impact For Christ Church In Rwanda
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
              Please review the partnership focus below and fill in the form to
              help us understand how you would like to collaborate with the
              church and its outreach work.
            </p>

            <div className="mt-6 space-y-3">
              {partnershipPoints.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-white/75"
                >
                  <span className="mr-2 font-semibold text-primary">
                    {index + 1}.
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-7 text-white/75">
              Once you submit this form, our team will review your interest and
              contact you to discuss the next step in building a fruitful
              partnership.
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Organization Logo
                  </Label>
                  <label className="mt-4 flex min-h-[138px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-950/40 px-4 text-center transition hover:border-primary hover:bg-white/[0.06]">
                    <Building2 className="h-8 w-8 text-primary" />
                    <span className="mt-3 text-sm font-medium text-white">
                      Upload logo or profile image
                    </span>
                    <span className="mt-1 text-xs text-white/55">
                      JPG, PNG up to 5MB
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Partnership Vision
                  </Label>
                  <Textarea
                    placeholder="Briefly describe the kind of partnership you are seeking with ICCR."
                    className="mt-4 min-h-[138px] border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="organization-name" className="text-sm text-white">
                    Organization / Partner Name
                  </Label>
                  <Input
                    id="organization-name"
                    placeholder="Enter organization or partner name"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-person" className="text-sm text-white">
                    Contact Person
                  </Label>
                  <Input
                    id="contact-person"
                    placeholder="Enter primary contact name"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm text-white">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="Enter country"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm text-white">
                    City / Region
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city or region"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partnership-type" className="text-sm text-white">
                    Partnership Type
                  </Label>
                  <Input
                    id="partnership-type"
                    placeholder="e.g Outreach, Sponsorship, Ministry, Training"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm text-white">
                    Website / Social Link
                  </Label>
                  <Input
                    id="website"
                    placeholder="Enter website or profile link"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <Label
                  htmlFor="proposal"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
                >
                  Partnership Proposal
                </Label>
                <Textarea
                  id="proposal"
                  placeholder="Describe your proposal, expected impact, available resources, and how you would like to work with ICCR."
                  className="mt-4 min-h-[150px] border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Supporting File
                  </Label>
                  <label className="mt-4 flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-950/40 px-4 text-center transition hover:border-primary hover:bg-white/[0.06]">
                    <Briefcase className="h-8 w-8 text-primary" />
                    <span className="mt-3 text-sm font-medium text-white">
                      Upload proposal or profile
                    </span>
                    <span className="mt-1 text-xs text-white/55">
                      PDF, DOC, JPG or PNG
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Areas of Interest
                  </Label>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      'Church projects',
                      'Community outreach',
                      'Charity support',
                      'Youth ministry',
                      'Training & discipleship',
                      'Media & communication',
                    ].map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white/75"
                      >
                        <Checkbox className="border-white/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary" />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Checkbox
                  id="partnership-agreement"
                  className="mt-1 border-white/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label
                  htmlFor="partnership-agreement"
                  className="text-sm leading-7 text-white/70"
                >
                  I confirm that this partnership request is made in good faith
                  and that I am open to transparent communication, shared values,
                  and collaboration with Impact For Christ Church In Rwanda.
                </Label>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  size="lg"
                  className="min-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Submit Partnership
                </Button>
                <Button
                  asChild
                  type="button"
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-transparent text-white hover:bg-white hover:text-foreground"
                >
                  <Link href="/contact">Talk to Our Team</Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-7 text-white/75">
                <p>
                  We welcome partnership discussions around ministry support,
                  outreach, training, and community impact. Share your proposal
                  and our team will get back to you.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-2 font-medium text-primary"
                >
                  Contact the partnership team
                  <Handshake className="h-4 w-4" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
