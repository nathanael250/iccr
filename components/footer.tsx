import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#111827] text-secondary-foreground border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <img src="/logo.png" alt="IFCM Logo" className="h-12 w-auto" />
            <p className="text-sm opacity-90">
              Impact For Christ Church In Rwanda - Doing the Works of Jesus Christ (John 14:12)
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="opacity-75 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="opacity-75 hover:opacity-100 transition-opacity">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/projects" className="opacity-75 hover:opacity-100 transition-opacity">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/charity" className="opacity-75 hover:opacity-100 transition-opacity">
                  Charity
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-base">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/membership" className="opacity-75 hover:opacity-100 transition-opacity">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/media" className="opacity-75 hover:opacity-100 transition-opacity">
                  Media
                </Link>
              </li>
              <li>
                <Link href="/give" className="opacity-75 hover:opacity-100 transition-opacity">
                  Give
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="opacity-75 hover:opacity-100 transition-opacity">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-bold text-base">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span className="opacity-90">Kigali, Rwanda</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+250" className="opacity-75 hover:opacity-100 transition-opacity">
                  Contact us
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@ifcmrwanda.org" className="opacity-75 hover:opacity-100 transition-opacity">
                  Email us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-border/20 pt-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs opacity-75">
          <p>&copy; {currentYear} Impact For Christ Church In Rwanda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
