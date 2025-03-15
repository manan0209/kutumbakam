import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-saffron-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">Contact Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch with Kutumbakam</h1>
              <p className="text-xl text-gray-600">
                Have questions, feedback, or need assistance? We're here to help you make a difference.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input id="name" placeholder="Enter your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="Enter your email address" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                            <SelectItem value="media">Media Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your inquiry or feedback"
                          rows={6}
                        />
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-saffron-dark">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">Our Location</h3>
                        <p className="text-gray-600">
                          123 Relief Center, Gandhi Nagar
                          <br />
                          New Delhi, 110001
                          <br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">Email Us</h3>
                        <p className="text-gray-600">
                          info@kutumbakam.org
                          <br />
                          support@kutumbakam.org
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">Call Us</h3>
                        <p className="text-gray-600">
                          +91 11 2345 6789
                          <br />
                          +91 98765 43210 (Emergency)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="text-primary mt-1" size={20} />
                      <div>
                        <h3 className="font-medium">Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Emergency Support: 24/7
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      For urgent matters related to active disaster relief efforts, please contact our emergency support
                      team.
                    </p>
                    <Button className="w-full bg-destructive hover:bg-red-600">Emergency Contact</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Quick answers to common questions</p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How quickly can I expect a response to my inquiry?
                  </h3>
                  <p className="text-gray-600">
                    We aim to respond to all inquiries within 24-48 hours. For urgent matters related to active disaster
                    relief efforts, please use our emergency contact channels for immediate assistance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Can I visit your office to discuss a partnership?
                  </h3>
                  <p className="text-gray-600">
                    Yes, we welcome visitors by appointment. Please contact us in advance to schedule a meeting with our
                    team.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    How can I report a technical issue with the platform?
                  </h3>
                  <p className="text-gray-600">
                    You can report technical issues through our contact form by selecting "Technical Support" as the
                    subject. Please provide as much detail as possible, including screenshots if applicable.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

