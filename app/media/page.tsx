import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Play, Podcast, Image as ImageIcon, FileText } from 'lucide-react'

export const metadata = {
  title: 'Media - Impact For Christ Church In Rwanda',
  description: 'Access sermons, messages, and media content from Impact For Christ Church In Rwanda.',
}

export default function Media() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
              Church Media
            </h1>
            <p className="text-lg opacity-90">
              Watch, listen, and access content from our church services and programs
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl space-y-16">
          {/* Videos Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Sermons & Messages</h2>
                <p className="text-muted-foreground">Watch our latest sermon videos and messages</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="#videos">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative bg-card/50 h-40 flex items-center justify-center group cursor-pointer">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Play className="w-12 h-12 text-primary-foreground opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-muted-foreground">Video Thumbnail</span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Sunday Sermon</CardTitle>
                    <CardDescription>March 16, 2026</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      "Living by Faith" - A powerful message about trusting God in all circumstances.
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link href="#">Watch Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Audio/Podcasts Section */}
          <div className="space-y-6 border-t border-border pt-16">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Audio Messages</h2>
                <p className="text-muted-foreground">Listen to sermons while commuting or working</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="#audio">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Podcast className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Pastor's Message</CardTitle>
                        <CardDescription>March 15, 2026</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      "The Power of Prayer" - Exploring how prayer transforms our lives and relationships.
                    </p>
                    <div className="flex gap-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href="#">Listen</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link href="#">Download</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Gallery Section */}
          <div className="space-y-6 border-t border-border pt-16">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Photo Gallery</h2>
                <p className="text-muted-foreground">Memories from our events and activities</p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="#gallery">View All</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer h-40 flex items-center justify-center">
                  <div className="text-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Event Photo</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-6 border-t border-border pt-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Resources & Documents</h2>
              <p className="text-muted-foreground">Study materials, articles, and helpful resources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Bible Study Guides',
                  description: 'Downloadable guides for in-depth Bible study on key topics',
                  icon: FileText
                },
                {
                  title: 'Sermon Notes',
                  description: 'Detailed notes and outlines from recent sermons',
                  icon: FileText
                },
                {
                  title: 'Prayer Devotionals',
                  description: 'Daily devotional guides for prayer and reflection',
                  icon: FileText
                },
                {
                  title: 'Ministry Newsletters',
                  description: 'Monthly newsletters with updates and announcements',
                  icon: FileText
                }
              ].map((resource, index) => {
                const Icon = resource.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">{resource.description}</p>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="#">Download</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Live Streaming Section */}
          <div className="space-y-6 border-t border-border pt-16 bg-card rounded-lg p-8 border border-border/50">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Live Stream Services</h2>
              <p className="text-muted-foreground">Join us online for our Sunday worship services</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-card-foreground/10 rounded-lg h-64 flex items-center justify-center mb-4 border border-border">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-primary mx-auto mb-3" />
                    <p className="text-muted-foreground">Live Stream Embed</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">Sunday Worship</h3>
                  <p className="text-muted-foreground mb-4">
                    Join us online every Sunday at 9:00 AM for our main worship service. Available on multiple platforms.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Watch On:</p>
                  <div className="space-y-2">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="#">YouTube</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="#">Facebook</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href="#">Website Live Stream</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="space-y-6 border-t border-border pt-16">
            <h2 className="text-3xl font-bold text-foreground">Stay Updated</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'YouTube Channel',
                  description: 'Subscribe to our YouTube channel for new videos and live streams',
                  cta: 'Subscribe'
                },
                {
                  title: 'Podcast',
                  description: 'Available on Spotify, Apple Podcasts, and other platforms',
                  cta: 'Listen'
                },
                {
                  title: 'Email Updates',
                  description: 'Get weekly updates delivered to your inbox',
                  cta: 'Sign Up'
                }
              ].map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                    <Button asChild size="sm" className="w-full">
                      <Link href="#">{item.cta}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
