import Image from 'next/image'
import Link from 'next/link'
import { LockKeyhole, Mail, ShieldCheck, Sparkles, UploadCloud } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const adminTasks = [
  'Upload ministry projects and impact reports',
  'Publish church updates, announcements, and events',
  'Manage website content for members and visitors',
]

export function AdminLoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Image
          src="/image.png"
          alt="Impact For Christ Church In Rwanda worship background"
          fill
          priority
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,95,171,0.88),rgba(15,23,42,0.96)_50%,rgba(235,95,39,0.82))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_28%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.15fr)_440px] lg:items-center">
          <section className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Admin Access
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Church owner and admin content dashboard starts here.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
              This area is reserved for the church team to manage projects,
              publish new updates, and keep the website content current.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: UploadCloud,
                  title: 'Project uploads',
                  description: 'Add new outreach and ministry work as it happens.',
                },
                {
                  icon: Sparkles,
                  title: 'Fresh updates',
                  description: 'Post announcements and important church news quickly.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Protected access',
                  description: 'Separate admin space for trusted church leadership.',
                },
              ].map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-white/12 bg-black/20 p-6 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
                Inside this dashboard
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-100 sm:text-base">
                {adminTasks.map((task) => (
                  <li key={task} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-primary" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <Card className="border-white/15 bg-white/95 py-0 text-slate-900 shadow-2xl shadow-slate-950/30">
              <CardHeader className="gap-3 border-b border-slate-200 px-8 py-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white">
                    <LockKeyhole className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-semibold text-slate-950">
                      Sign in to admin
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm leading-6 text-slate-600">
                      Use your administrator credentials to manage church content.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-8 py-8">
                <form className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-slate-800">
                      Admin email
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="admin-email"
                        type="email"
                        placeholder="admin@iccrwanda.org"
                        className="h-11 border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <Label htmlFor="admin-password" className="text-slate-800">
                        Password
                      </Label>
                      <button
                        type="button"
                        className="text-sm font-medium text-secondary transition hover:text-secondary/80"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="admin-password"
                        type="password"
                        placeholder="Enter your password"
                        className="h-11 border-slate-200 bg-white pl-10 text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                      />
                      <span>Keep me signed in</span>
                    </label>
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                      Secure access
                    </span>
                  </div>

                  <Button asChild size="lg" className="h-11 w-full text-sm font-semibold">
                    <Link href="/admin/dashboard">Sign in</Link>
                  </Button>
                </form>

                <div className="mt-6 rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-600">
                  Authentication logic comes next. For now, this login screen
                  leads into the dashboard layout preview.
                </div>

                <div className="mt-6 text-center text-sm text-slate-600">
                  Return to the public website?{' '}
                  <Link href="/" className="font-semibold text-secondary transition hover:text-secondary/80">
                    Back to homepage
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
