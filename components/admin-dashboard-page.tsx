'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowUpRight,
  BellRing,
  CalendarDays,
  FolderKanban,
  HandHeart,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  MessageSquareMore,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  UploadCloud,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const sidebarSections = [
  {
    label: 'Main',
    items: [
      { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard, available: true },
      { name: 'Projects', icon: FolderKanban, available: false },
      { name: 'Events', icon: CalendarDays, available: false },
      { name: 'Media', icon: ImageIcon, available: false },
    ],
  },
  {
    label: 'Church',
    items: [
      { name: 'Partnerships', icon: HandHeart, available: false },
      { name: 'Members', icon: Users, available: false },
      { name: 'Messages', icon: MessageSquareMore, available: false },
      { name: 'Settings', icon: Settings, available: false },
    ],
  },
]

const stats = [
  {
    label: 'Published projects',
    value: '12',
    change: '+3 this month',
    accent: 'bg-primary/12 text-primary',
  },
  {
    label: 'Upcoming events',
    value: '5',
    change: '2 need updates',
    accent: 'bg-secondary/12 text-secondary',
  },
  {
    label: 'Media uploads',
    value: '48',
    change: '8 pending review',
    accent: 'bg-slate-900/8 text-slate-700',
  },
]

const contentQueue = [
  {
    title: 'Youth outreach project gallery',
    type: 'Project',
    author: 'Church Admin',
    status: 'Ready to publish',
    statusClass: 'bg-primary/15 text-primary',
  },
  {
    title: 'Sunday worship announcement',
    type: 'Update',
    author: 'Media Team',
    status: 'In review',
    statusClass: 'bg-secondary/15 text-secondary',
  },
  {
    title: 'Community prayer event poster',
    type: 'Media',
    author: 'Owner',
    status: 'Draft',
    statusClass: 'bg-slate-200 text-slate-700',
  },
]

const tasks = [
  'Upload the latest project photos and short impact summary.',
  'Review this week’s event announcement before publishing.',
  'Update the partnership section with new testimony content.',
]

export function AdminDashboardPage() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 flex-col bg-secondary text-white lg:flex">
          <div className="border-b border-white/10 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                  ICCR Admin
                </p>
                <h1 className="mt-1 text-lg font-semibold">Church Dashboard</h1>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
            {sidebarSections.map((section) => (
              <div key={section.label}>
                <p className="px-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                  {section.label}
                </p>
                <div className="mt-3 space-y-1">
                  {section.items.map(({ name, href, icon: Icon, available }) => {
                    const isActive = available && pathname === href
                    const classes = `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-white text-secondary shadow-sm'
                        : available
                          ? 'text-white/82 hover:bg-white/10 hover:text-white'
                          : 'cursor-not-allowed text-white/45'
                    }`

                    if (!available) {
                      return (
                        <div key={name} className={classes}>
                          <Icon className="h-4 w-4" />
                          <span className="flex-1">{name}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                            Soon
                          </span>
                        </div>
                      )
                    }

                    return (
                      <Link key={name} href={href!} className={classes}>
                        <Icon className="h-4 w-4" />
                        <span>{name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/admin/login"
              className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span>Back to login</span>
            </Link>
          </div>
        </aside>

        <main className="flex-1">
          <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
            <header className="rounded-[2rem] bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200 sm:px-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                    Admin workspace
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-950 sm:text-3xl">
                    Manage projects, updates, and church content from one place.
                  </h2>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative w-full sm:w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search content"
                      className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-10"
                    />
                  </div>
                  <Button size="lg" className="h-11 rounded-2xl">
                    <Plus className="h-4 w-4" />
                    New content
                  </Button>
                </div>
              </div>
            </header>

            <div className="mt-4 flex flex-wrap gap-2 lg:hidden">
              {sidebarSections
                .flatMap((section) => section.items)
                .slice(0, 4)
                .map(({ name, href, available }) =>
                  available ? (
                    <Link
                      key={name}
                      href={href!}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        pathname === href
                          ? 'bg-secondary text-white'
                          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {name}
                    </Link>
                  ) : (
                    <span
                      key={name}
                      className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-500"
                    >
                      {name}
                    </span>
                  ),
                )}
            </div>

            <section className="mt-4 rounded-[2rem] bg-[linear-gradient(135deg,rgba(2,95,171,1),rgba(15,23,42,0.96)_52%,rgba(235,95,39,1))] px-6 py-7 text-white shadow-xl shadow-slate-300/40 sm:px-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_340px]">
                <div>
                  <Badge className="bg-white/12 text-white hover:bg-white/12">
                    Owner / Admin panel
                  </Badge>
                  <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                    Publish what the church is doing without leaving the dashboard.
                  </h3>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-100 sm:text-base">
                    This layout is built around your current church colors so the
                    admin side still feels connected to the public website while
                    staying focused on content management.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      type="button"
                      size="lg"
                      className="h-11 rounded-2xl bg-white text-secondary hover:bg-slate-100"
                    >
                      <UploadCloud className="h-4 w-4" />
                      Upload project
                    </Button>
                    <Button
                      type="button"
                      size="lg"
                      variant="secondary"
                      className="h-11 rounded-2xl bg-white/12 text-white hover:bg-white/18"
                    >
                      <BellRing className="h-4 w-4" />
                      Create announcement
                    </Button>
                  </div>
                </div>

                <Card className="border-white/10 bg-white/10 py-0 text-white shadow-none backdrop-blur-sm">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-lg font-semibold">Today’s focus</CardTitle>
                    <CardDescription className="text-slate-200">
                      Keep the most visible ministry updates fresh.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6">
                    {tasks.map((task) => (
                      <div
                        key={task}
                        className="rounded-2xl border border-white/12 bg-black/10 px-4 py-3"
                      >
                        <p className="text-sm leading-6 text-slate-100">{task}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mt-5 grid gap-4 md:grid-cols-3">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                  <CardContent className="px-6 py-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.accent}`}>
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-sm text-slate-500">{stat.label}</p>
                    <div className="mt-2 flex items-end justify-between gap-3">
                      <span className="text-3xl font-semibold text-slate-950">{stat.value}</span>
                      <span className="text-sm font-medium text-slate-500">{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_360px]">
              <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                <CardHeader className="px-6 py-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl font-semibold text-slate-950">
                        Content queue
                      </CardTitle>
                      <CardDescription className="mt-1 text-slate-500">
                        Drafts and items waiting for publication.
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-3 py-1">
                      3 active items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-200">
                        <TableHead className="px-6">Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="pr-6">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contentQueue.map((item) => (
                        <TableRow key={item.title} className="border-slate-200">
                          <TableCell className="px-6 py-4 font-medium text-slate-900">
                            {item.title}
                          </TableCell>
                          <TableCell className="py-4 text-slate-600">{item.type}</TableCell>
                          <TableCell className="py-4 text-slate-600">{item.author}</TableCell>
                          <TableCell className="py-4 pr-6">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.statusClass}`}
                            >
                              {item.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="space-y-5">
                <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-xl font-semibold text-slate-950">
                      Quick publish
                    </CardTitle>
                    <CardDescription className="mt-1 text-slate-500">
                      Draft the next project or announcement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Title</label>
                      <Input
                        placeholder="Community outreach update"
                        className="h-11 rounded-xl border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Category</label>
                      <select className="flex h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-900 outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20">
                        <option>Projects</option>
                        <option>Announcements</option>
                        <option>Events</option>
                        <option>Media</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Summary</label>
                      <Textarea
                        placeholder="Write a short summary that will appear on the website."
                        className="min-h-28 rounded-xl border-slate-200 bg-slate-50"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" className="flex-1 rounded-xl">
                        Save draft
                      </Button>
                      <Button type="button" variant="outline" className="flex-1 rounded-xl">
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 py-0 shadow-sm ring-1 ring-slate-200">
                  <CardHeader className="px-6 py-6">
                    <CardTitle className="text-xl font-semibold text-slate-950">
                      Admin notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-sm leading-6 text-slate-600">
                        This is the dashboard layout stage. The next step is connecting
                        each action to real create, edit, upload, and publish flows.
                      </p>
                    </div>
                    <Separator className="my-4 bg-slate-200" />
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-primary/10 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Public site link</p>
                        <p className="text-xs text-slate-600">Review how live visitors see changes.</p>
                      </div>
                      <Button asChild variant="secondary" className="rounded-xl">
                        <Link href="/">Open site</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
