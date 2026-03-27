'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  BadgeDollarSign,
  CheckCircle2,
  CreditCard,
  HandCoins,
  ShieldCheck,
  Smartphone,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata = {
  title: 'Give - Impact For Christ Church In Rwanda',
  description: 'Support our mission through generous giving to Impact For Christ Church In Rwanda.',
}

const givingPurposes = [
  'Tithe',
  'Offering',
  'Thanksgiving',
  'Project Support',
  'Charity & Outreach',
  'Special Seed',
]

const currencies = ['RWF', 'USD', 'EUR']

type PaymentCategory = 'mobile-money' | 'credit-card'

export default function Give() {
  const [paymentCategory, setPaymentCategory] = useState<PaymentCategory>('credit-card')

  return (
    <div className="w-full bg-background">
      {/* <section className="relative overflow-hidden px-4 py-16 text-white sm:py-24">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,95,171,1),rgba(15,23,42,0.96)_55%,rgba(235,95,39,1))]" />
        <div className="container relative z-10 mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur-sm">
            Church Giving
          </div>
          <h1 className="mt-5 text-4xl font-bold text-balance sm:text-5xl">
            Fill in your giving details
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
            Complete the form below to prepare your church giving through mobile
            money, credit card, or PayPal.
          </p>
        </div>
      </section> */}

      <section className="px-4 py-16 sm:py-20">
        <div className="container mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="space-y-3">
              <CardTitle className="text-3xl">Giving Form</CardTitle>
              <CardDescription className="text-base leading-7 text-muted-foreground">
                Enter your details, choose how you want to give, then set the
                amount and currency.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input id="full-name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-address">Email</Label>
                    <Input
                      id="email-address"
                      type="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="giving-purpose">Giving Option</Label>
                  <select
                    id="giving-purpose"
                    className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a giving option
                    </option>
                    {givingPurposes.map((purpose) => (
                      <option key={purpose} value={purpose}>
                        {purpose}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <Label>Payment Type</Label>
                  <div className="grid gap-3 rounded-3xl bg-slate-100 p-2 sm:grid-cols-2">
                    {[
                      {
                        value: 'mobile-money' as PaymentCategory,
                        title: 'Mobile Money',
                        description: 'MTN/Airtel Rwanda',
                      },
                      {
                        value: 'credit-card' as PaymentCategory,
                        title: 'Credit Card',
                        description: 'Card payment',
                      },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex cursor-pointer flex-col rounded-2xl px-4 py-4 text-center transition ${
                          paymentCategory === option.value
                            ? 'bg-white text-slate-950 shadow-sm'
                            : 'text-slate-600 hover:bg-white/70'
                        }`}
                      >
                        <span className="text-2xl leading-none text-primary/80">
                          {paymentCategory === option.value ? (
                            <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-sky-500" />
                          ) : null}
                        </span>
                        <span className="text-xl font-semibold leading-none">
                          {option.title}
                        </span>
                        <span className="mt-2 text-sm text-slate-600">
                          {option.description}
                        </span>
                        <input
                          type="radio"
                          name="payment-category"
                          value={option.value}
                          checked={paymentCategory === option.value}
                          onChange={() => setPaymentCategory(option.value)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {paymentCategory === 'mobile-money' ? (
                  <div className="space-y-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input
                      id="phone-number"
                      type="tel"
                      placeholder="Enter your mobile money phone number"
                    />
                  </div>
                ) : null}

                <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_160px]">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="Enter amount" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <select
                      id="currency"
                      defaultValue="RWF"
                      className="flex h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20"
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Continue Giving
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Church Giving Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="rounded-2xl border border-primary/15 bg-white p-4">
                  <p className="font-medium text-foreground">Church Offering Code 1</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    *182*8*1*512347#
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IMPACT FOR CHRIST CHURCH IN RWANDA
                  </p>
                </div>
                <div className="rounded-2xl border border-primary/15 bg-white p-4">
                  <p className="font-medium text-foreground">Church Offering Code 2</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    *182*8*1*100545#
                  </p>
                  <p className="text-sm text-muted-foreground">
                    IMPACT FOR CHRIST CHURCH IN RWANDA
                  </p>
                </div>
                <p>
                  Use the form to choose your giving option and preferred payment
                  method before completing the payment.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Accepted Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Smartphone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Mobile Money</p>
                    <p>Phone number required for mobile money giving</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Credit Card</p>
                    <p>No extra payment field is needed here</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HandCoins className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Giving Support</p>
                    <p>impactforchristrwanda@gmail.com</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Contact Church Office</Link>
                </Button>
              </CardContent>
            </Card>

            
          </div>
        </div>
      </section>
    </div>
  )
}
