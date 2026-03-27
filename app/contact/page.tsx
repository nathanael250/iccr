'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { useState } from 'react'

const churchEmail = 'impactforchristrwanda@gmail.com'
const churchMapUrl = 'https://maps.app.goo.gl/31ZQ2W4oii84JNBE8?g_st=iw'
const churchMapEmbedUrl =
  'https://www.google.com/maps?q=Impact%20For%20Christ%20Church%20In%20Rwanda%2C%20Kigali%2C%20Rwanda&z=15&output=embed'
const churchPhones = [
  { label: '0782201563', href: 'tel:+250782201563' },
  { label: '0788681038', href: 'tel:+250788681038' },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">
              Get in Touch
            </h1>
            <p className="text-lg opacity-90">
              We'd love to hear from you. Reach out with any questions or inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              </div>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <MapPin className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">
                    Impact For Christ Church In Rwanda
                  </p>
                  <p className="text-muted-foreground">
                    Kigali, Rwanda
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Phone className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Phone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  {churchPhones.map((phone) => (
                    <a key={phone.label} href={phone.href} className="block text-primary hover:underline font-medium">
                      {phone.label}
                    </a>
                  ))}
                  <p className="text-xs text-muted-foreground mt-2">Monday - Friday, 9:00 AM - 5:00 PM</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Mail className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a href={`mailto:${churchEmail}`} className="text-primary hover:underline font-medium">
                    {churchEmail}
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">We typically respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Clock className="w-6 h-6 text-primary mb-2" />
                  <CardTitle className="text-lg">Service Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="font-medium text-foreground">Sunday</p>
                    <p className="text-sm text-muted-foreground">7:00 AM - 3:00 PM</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Office Hours</p>
                    <p className="text-sm text-muted-foreground">Mon - Fri: 9:00 AM - 5:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="0782201563"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="membership">Membership</option>
                        <option value="events">Events</option>
                        <option value="volunteering">Volunteering</option>
                        <option value="giving">Giving/Donations</option>
                        <option value="partnership">Partnership</option>
                        <option value="prayer">Prayer Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {/* Success Message */}
                    {submitted && (
                      <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary">
                        <p className="text-sm font-medium">Thank you! Your message has been sent successfully. We'll be in touch soon.</p>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl font-bold text-foreground">Find Us</h2>
            <div className="bg-card rounded-lg overflow-hidden border border-border min-h-96">
              <div className="grid min-h-96 lg:grid-cols-[minmax(0,1.4fr)_320px]">
                <iframe
                  title="Impact For Christ Church In Rwanda location map"
                  src={churchMapEmbedUrl}
                  className="h-96 w-full border-0 lg:h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-col justify-center bg-[radial-gradient(circle_at_top,rgba(2,95,171,0.18),transparent_35%),linear-gradient(135deg,rgba(235,95,39,0.08),rgba(2,95,171,0.08))] px-6 py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-foreground">
                    Impact For Christ Church In Rwanda
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    View the live map here or open the full Google Maps app for directions.
                  </p>
                  <Button asChild className="mt-6 bg-primary hover:bg-primary/90">
                    <a href={churchMapUrl} target="_blank" rel="noreferrer">
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>


          {/* FAQ */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  question: 'How can I visit for the first time?',
                  answer: 'We\'d love to welcome you! Arrive 15 minutes early, and our team will help you get situated. No special knowledge or experience is required—just come as you are.'
                },
                {
                  question: 'What should I wear to church?',
                  answer: 'Come as you are! We have members who wear everything from casual to formal attire. The most important thing is that you\'re here.'
                },
                {
                  question: 'How can I request prayer?',
                  answer: 'You can submit a prayer request through our contact form, call us, or speak with someone before or after service.'
                },
                // {
                //   question: 'Is childcare available?',
                //   answer: 'Yes! We offer nursery and children\'s ministry during Sunday services. Please ask at the welcome desk for more information.'
                // }
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
        </div>
      </section>
    </div>
  )
}
