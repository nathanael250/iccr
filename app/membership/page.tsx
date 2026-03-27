import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Camera, FileUp, Upload } from 'lucide-react'

export const metadata = {
  title: 'Membership - Impact For Christ Church In Rwanda',
  description:
    'Apply for church membership and become part of Impact For Christ Church In Rwanda.',
}

const commitments = [
  'Make God’s Word the foundation of your life and walk in obedience to Christ.',
  'Love God and love people through prayer, service, and Christ-like character.',
  'Participate faithfully in worship, fellowship, and the life of the church.',
  'Support the work of the ministry through tithes, offerings, and thanksgiving.',
  'Seek spiritual growth, accountability, and service under biblical leadership.',
]

export default function Membership() {
  return (
    <div className="w-full bg-background">
      <section className="grid min-h-[calc(100vh-5.5rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative min-h-[340px] overflow-hidden lg:min-h-full">
          <img
            src="/image.png"
            alt="Impact For Christ Church ministry gathering"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,95,171,0.12),rgba(17,24,39,0.35))]" />
          <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/15 bg-slate-950/45 p-5 text-white backdrop-blur-sm sm:inset-x-8 sm:bottom-8 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Membership Journey
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Join the church family and grow with us in Christ.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Become part of a faith community committed to worship, prayer,
              discipleship, outreach, and the works of Jesus Christ in Rwanda.
            </p>
          </div>
        </div>

        <div className="bg-[#111827] px-4 py-10 text-white sm:px-8 sm:py-12 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
              Collaborate With Us At ICCR
            </div>

            <h2 className="mt-5 text-3xl font-bold text-balance sm:text-4xl">
              Become a committed member of Impact For Christ Church In Rwanda
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/75 sm:text-base">
              Please review the commitments below before filling in the
              membership form. We welcome believers who are ready to grow in
              faith, live in fellowship, and serve with love.
            </p>

            <div className="mt-6 space-y-3">
              {commitments.map((item, index) => (
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
              If you agree with these commitments and would like to become a
              member, fill in the form below. Our team will review your
              application and contact you with the next step.
            </p>

            <form className="mt-8 space-y-6">
              <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Passport Photo
                  </Label>
                  <label className="mt-4 flex min-h-[138px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-950/40 px-4 text-center transition hover:border-primary hover:bg-white/[0.06]">
                    <Camera className="h-8 w-8 text-primary" />
                    <span className="mt-3 text-sm font-medium text-white">
                      Select a photograph
                    </span>
                    <span className="mt-1 text-xs text-white/55">
                      JPG, PNG up to 5MB
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Membership Notes
                  </Label>
                  <Textarea
                    placeholder="Tell us briefly why you want to become a member of ICCR."
                    className="mt-4 min-h-[138px] border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-sm text-white">Gender</Label>
                  <div className="flex flex-wrap gap-3">
                    {['Male', 'Female'].map((option, index) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:bg-primary/10"
                      >
                        <input
                          defaultChecked={index === 0}
                          type="radio"
                          name="gender"
                          className="h-4 w-4 accent-[#EB5F27]"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm text-white">Marital Status</Label>
                  <div className="flex flex-wrap gap-3">
                    {['Single', 'Married'].map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/80 transition hover:border-primary hover:bg-primary/10"
                      >
                        <input
                          type="radio"
                          name="marital-status"
                          className="h-4 w-4 accent-[#EB5F27]"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-sm text-white">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="e.g Christopher"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-sm text-white">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="e.g Orji"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone-number" className="text-sm text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone-number"
                    placeholder="XXX-XX-XXXX-XXX"
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
                    placeholder="e.g info@iccr.rw"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation" className="text-sm text-white">
                    Occupation
                  </Label>
                  <Input
                    id="occupation"
                    placeholder="Enter your occupation"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-sm text-white">
                    Nationality
                  </Label>
                  <Input
                    id="nationality"
                    placeholder="Enter your nationality"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="country-residence"
                    className="text-sm text-white"
                  >
                    Country of Residence
                  </Label>
                  <Input
                    id="country-residence"
                    placeholder="Enter your country of residence"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region" className="text-sm text-white">
                    State of Origin / Region
                  </Label>
                  <Input
                    id="region"
                    placeholder="Enter your state of origin / region"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-password"
                    className="text-sm text-white"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    className="h-12 border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Supporting Document
                  </Label>
                  <label className="mt-4 flex min-h-[132px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-slate-950/40 px-4 text-center transition hover:border-primary hover:bg-white/[0.06]">
                    <FileUp className="h-8 w-8 text-primary" />
                    <span className="mt-3 text-sm font-medium text-white">
                      Upload a document
                    </span>
                    <span className="mt-1 text-xs text-white/55">
                      Optional supporting file
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                  <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                    Service Interest
                  </Label>
                  <Textarea
                    placeholder="Share how you would like to serve in the church."
                    className="mt-4 min-h-[132px] border-white/10 bg-slate-950/50 text-white placeholder:text-white/35"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Checkbox
                  id="agreement"
                  className="mt-1 border-white/30 data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                />
                <Label
                  htmlFor="agreement"
                  className="text-sm leading-7 text-white/70"
                >
                  I agree with the membership commitments of Impact For Christ
                  Church In Rwanda and I am ready to walk in fellowship, prayer,
                  obedience, and faithful service.
                </Label>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  size="lg"
                  className="min-w-[220px] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Submit Now
                </Button>
                <Button
                  asChild
                  type="button"
                  size="lg"
                  variant="outline"
                  className="border-white/15 bg-transparent text-white hover:bg-white hover:text-foreground"
                >
                  <Link href="/contact">Ask Questions</Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 text-sm leading-7 text-white/75">
                <p>
                  Need help with your membership application? Contact the church
                  office through the contact page and our team will assist you.
                </p>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex items-center gap-2 font-medium text-primary"
                >
                  Contact the church office
                  <Upload className="h-4 w-4" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
