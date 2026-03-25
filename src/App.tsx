import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import RootLayout from '@/app/layout'
import About from '@/app/about/page'
import AboutLeadership from '@/app/about/leadership/page'
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
