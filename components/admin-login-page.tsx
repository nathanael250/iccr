'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { LoaderCircle, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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
import { getStoredAdminToken } from '@/lib/admin/request'
import { loginAdmin } from '@/lib/admin/service'

const seededAdminEmail = 'admin@iccrwanda.org'
const seededAdminPassword = 'Admin@12345'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(seededAdminEmail)
  const [password, setPassword] = useState(seededAdminPassword)
  const [remember, setRemember] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (getStoredAdminToken()) {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (submitting) {
      return
    }

    setSubmitting(true)
    setErrorMessage('')

    try {
      await loginAdmin({
        email,
        password,
        remember,
      })
      navigate('/admin/dashboard', { replace: true })
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to sign in right now.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(2,95,171,0.18),transparent_28%),linear-gradient(135deg,#0f172a_0%,#111827_58%,rgba(217,119,6,0.24)_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 lg:px-12">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <section className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/75">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Admin Access
            </span>

            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              Church owner and admin content dashboard.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Sign in to manage projects, events, media, members, partners,
              prayer requests, and website updates from one place.
            </p>

            <div className="mt-8 max-w-xl rounded-3xl border border-white/10 bg-white/5 px-6 py-5">
              <p className="text-sm leading-7 text-slate-200">
                This login now authenticates directly against the admin user
                stored in MongoDB.
              </p>
            </div>
          </section>

          <section>
            <Card className="border-white/10 bg-white text-slate-900 shadow-2xl shadow-slate-950/25">
              <CardHeader className="space-y-3 border-b border-slate-200 px-8 py-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
                    <LockKeyhole className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-semibold text-slate-950">
                      Sign in
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm leading-6 text-slate-500">
                      Use the admin account to open the dashboard.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-8 py-8">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="admin-email" className="text-slate-800">
                      Admin email
                    </Label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="admin-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-base text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="admin-password" className="text-slate-800">
                      Password
                    </Label>
                    <div className="relative">
                      <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="admin-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-base text-slate-900 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span>Keep me signed in</span>
                  </label>

                  {errorMessage ? (
                    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-600">
                      {errorMessage}
                    </div>
                  ) : null}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="h-12 w-full rounded-xl text-sm font-semibold"
                  >
                    {submitting ? (
                      <>
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Signing in
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </form>

                <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-500">
                  Default admin for this setup:
                  <span className="ml-1 font-semibold text-slate-700">
                    {seededAdminEmail}
                  </span>
                </div>

                <div className="mt-6 text-center text-sm text-slate-500">
                  Return to the public website?{' '}
                  <Link
                    href="/"
                    className="font-semibold text-primary transition hover:text-primary/80"
                  >
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
