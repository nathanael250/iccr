import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Gift, Zap, TrendingUp } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const metadata = {
  title: 'Give - Impact For Christ Church In Rwanda',
  description: 'Support our mission through generous giving to Impact For Christ Church In Rwanda.',
}

export default function Give() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
              Support Our Mission
            </h1>
            <p className="text-lg opacity-90">
              Your generosity enables us to do the works of Jesus Christ in our community
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-4xl space-y-12">
          {/* Why Give */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Why Give to Our Church?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When you give to Impact For Christ Church In Rwanda, you're investing in a mission that transforms lives and strengthens our community. Every gift supports our ministries, programs, and outreach efforts that make a real difference.
            </p>
          </div>

          {/* Impact of Giving */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { amount: '$10', impact: 'Provides a meal for a hungry child' },
              { amount: '$25', impact: 'Funds school supplies for a student' },
              { amount: '$50', impact: 'Supports a family in need' },
              { amount: '$100+', impact: 'Enables major program initiatives' }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">{item.amount}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.impact}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ways to Give */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Ways to Give</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Online Giving */}
              <Card className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <Zap className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Online Giving</CardTitle>
                  <CardDescription>Fast and secure online donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Give securely online through our payment platform. One-time or recurring gifts available.
                  </p>
                  <div className="space-y-2">
                    <Button asChild className="w-full bg-primary hover:bg-primary/90">
                      <Link href="/give/online">Give Online Now</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">Secure and encrypted</p>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile Pay */}
              <Card className="hover:shadow-lg transition-shadow border-primary/20">
                <CardHeader>
                  <Heart className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Mobile Money</CardTitle>
                  <CardDescription>Give via mobile payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Send gifts through mobile money platforms for easy, convenient giving anytime, anywhere.
                  </p>
                  <div className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Get Mobile Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                          <DialogTitle>Mobile Money Details</DialogTitle>
                          <DialogDescription>
                            Use the Operation Joseph Rwanda mobile money option below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/40 p-5">
                          <div>
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              Mobile Money
                            </p>
                            <p className="mt-2 text-lg font-semibold text-foreground">
                              *182*8*1*100546#
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Operation Joseph C Ltd
                            </p>
                          </div>
                          <div className="text-sm leading-7 text-muted-foreground">
                            <p>For questions or confirmation, contact:</p>
                            <p className="mt-1 font-medium text-foreground">
                              operationjosephrwanda@gmail.com
                            </p>
                            <p className="font-medium text-foreground">
                              +250 788 304 392
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* Bank Transfer */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Bank Transfer</CardTitle>
                  <CardDescription>Direct bank donations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Make one-time or recurring donations directly from your bank account.
                  </p>
                  <div className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Request Bank Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Bank Transfer Details</DialogTitle>
                          <DialogDescription>
                            Use the Operation Joseph Rwanda banking details below for giving.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-border/70 bg-muted/40 p-5">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              Bank
                            </p>
                            <p className="mt-2 text-lg font-semibold text-foreground">
                              BPR Bank Rwanda
                            </p>
                            <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              Account Name
                            </p>
                            <p className="mt-2 text-base font-medium text-foreground">
                              Operation Joseph
                            </p>
                            <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              SWIFT Code
                            </p>
                            <p className="mt-2 text-base font-medium text-foreground">
                              BPRWRWRW
                            </p>
                          </div>
                          <div className="rounded-2xl border border-border/70 bg-muted/40 p-5">
                            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              USD Account
                            </p>
                            <p className="mt-2 text-lg font-semibold text-foreground">
                              4492634940
                            </p>
                            <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                              FRW Account
                            </p>
                            <p className="mt-2 text-lg font-semibold text-foreground">
                              4492634916
                            </p>
                          </div>
                        </div>
                        <div className="rounded-2xl border border-border/70 bg-background p-4 text-sm leading-7 text-muted-foreground">
                          <p>For giving confirmation or help, contact:</p>
                          <p className="mt-1 font-medium text-foreground">
                            operationjosephrwanda@gmail.com
                          </p>
                          <p className="font-medium text-foreground">
                            +250 788 304 392
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              {/* In-Church Giving */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Gift className="w-8 h-8 text-primary mb-2" />
                  <CardTitle className="text-lg">In-Church Giving</CardTitle>
                  <CardDescription>Give during worship services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Tithes and offerings are collected during our Sunday worship services.
                  </p>
                  <div className="space-y-2">
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/events">Visit Our Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-3xl font-bold text-foreground">Giving FAQs</h2>
            
            <div className="space-y-4">
              {[
                {
                  question: 'Is my donation secure?',
                  answer: 'Yes! All online donations are processed through secure, encrypted payment systems that protect your personal information.'
                },
                {
                  question: 'Can I give anonymously?',
                  answer: 'Yes, you may give anonymously during services or request to remain anonymous for online gifts.'
                },
                {
                  question: 'What happens if I need to cancel recurring giving?',
                  answer: 'You can update or cancel recurring gifts anytime through your online account or by contacting our office.'
                },
                {
                  question: 'Can I specify where my donation goes?',
                  answer: 'Yes! You can designate your gift for specific projects, programs, or ministries when you give.'
                }
              ].map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-secondary text-secondary-foreground rounded-lg p-8 text-center space-y-4 border border-secondary/50">
            <h3 className="text-2xl font-bold">Ready to Make a Difference?</h3>
            <p className="opacity-90 max-w-2xl mx-auto">
              Your generosity helps us fulfill our mission of doing the works of Jesus Christ. Thank you for supporting Impact For Christ Church In Rwanda!
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 mt-4">
              <Link href="/give/online">Give Online Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
