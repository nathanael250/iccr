'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'About',
      href: '/about',
      children: [
        { name: 'About Church', href: '/about' },
        { name: 'Church Leadership', href: '/about/leadership' },
      ],
    },
    { name: 'Events', href: '/events' },
    { name: 'Projects', href: '/projects' },
    { name: 'Charity', href: '/charity' },
    { name: 'Partnership', href: '/partnership' },
    { name: 'Membership', href: '/membership' },
    { name: 'Media', href: '/media' },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-1">
        <Link href="/" className="flex items-center flex-shrink-0">
          <img src="/logo.png" alt="Impact For Christ Church In Rwanda" className="h-14 w-auto sm:h-20" />
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 outline-none',
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-foreground hover:bg-accent/10 hover:text-primary',
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="w-56 rounded-2xl border-border/70 p-2 shadow-xl"
                >
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.href}
                      asChild
                      className="cursor-pointer rounded-xl px-3 py-3 text-sm font-medium"
                    >
                      <Link href={child.href}>{child.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-accent/10 hover:text-primary',
                )}
              >
                {item.name}
              </Link>
            ),
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-accent/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden border-t border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.href} className="rounded-xl border border-border/70">
                  <button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition',
                      isActive(item.href)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent/10 hover:text-primary',
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isAboutOpen && 'rotate-180',
                      )}
                    />
                  </button>

                  {isAboutOpen && (
                    <div className="flex flex-col gap-1 px-2 pb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-accent/10 hover:text-primary"
                          onClick={() => {
                            setIsOpen(false)
                            setIsAboutOpen(false)
                          }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-sm font-medium transition',
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-accent/10 hover:text-primary',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
