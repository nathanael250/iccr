import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import RootLayout from '@/app/layout'
import About from '@/app/about/page'
import AboutLeadership from '@/app/about/leadership/page'
import Admin from '@/app/admin/page'
import AdminDashboard from '@/app/admin/dashboard/page'
import AdminEventEdit from '@/app/admin/events/[eventId]/edit/page'
import AdminEvents from '@/app/admin/events/page'
import AdminEventCreate from '@/app/admin/events/new/page'
import AdminGiving from '@/app/admin/giving/page'
import AdminLogin from '@/app/admin/login/page'
import AdminMedia from '@/app/admin/media/page'
import AdminMemberDetail from '@/app/admin/members/[recordId]/page'
import AdminMembers from '@/app/admin/members/page'
import AdminPartnerDetail from '@/app/admin/partners/[recordId]/page'
import AdminPartners from '@/app/admin/partners/page'
import AdminPrayerRequests from '@/app/admin/prayer-requests/page'
import AdminProjectEdit from '@/app/admin/projects/[projectId]/edit/page'
import AdminProjects from '@/app/admin/projects/page'
import AdminProjectCreate from '@/app/admin/projects/new/page'
import AdminSettings from '@/app/admin/settings/page'
import Charity from '@/app/charity/page'
import Contact from '@/app/contact/page'
import Events from '@/app/events/page'
import Give from '@/app/give/page'
import OnlineGivingPage from '@/app/give/online/page'
import Home from '@/app/page'
import Media from '@/app/media/page'
import Membership from '@/app/membership/page'
import Partnership from '@/app/partnership/page'
import ProjectDetailPage from '@/app/projects/[slug]/page'
import Projects from '@/app/projects/page'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash.replace('#', ''))

        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      })

      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

function NotFoundPage() {
  return (
    <div className="bg-background px-4 py-24">
      <div className="container mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/new" element={<AdminProjectCreate />} />
          <Route path="/admin/projects/:projectId/edit" element={<AdminProjectEdit />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/events/new" element={<AdminEventCreate />} />
          <Route path="/admin/events/:eventId/edit" element={<AdminEventEdit />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          <Route path="/admin/members" element={<AdminMembers />} />
          <Route path="/admin/members/:recordId" element={<AdminMemberDetail />} />
          <Route path="/admin/partners" element={<AdminPartners />} />
          <Route path="/admin/partners/:recordId" element={<AdminPartnerDetail />} />
          <Route path="/admin/prayer-requests" element={<AdminPrayerRequests />} />
          <Route path="/admin/giving" element={<AdminGiving />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/leadership" element={<AboutLeadership />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/give" element={<Give />} />
          <Route path="/give/online" element={<OnlineGivingPage />} />
          <Route path="/media" element={<Media />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </RootLayout>
    </BrowserRouter>
  )
}
