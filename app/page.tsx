"use client"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DisasterPortal, getActivePortals } from "@/lib/db"
import { ArrowRight, Calendar, Globe, Heart, MapPin, Package, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

// Success stories
const successStories = [
  {
    id: "1",
    title: "Kerala Floods 2018",
    description: "How 10,000 volunteers coordinated to rescue 50,000 people",
    impact: "50,000 people rescued",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    title: "Odisha Cyclone Fani",
    description: "Community-led evacuation that saved thousands of lives",
    impact: "1.2 million people evacuated",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    title: "Gujarat Earthquake Relief",
    description: "Rebuilding 200 homes in record time through volunteer coordination",
    impact: "200 homes rebuilt",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function Home() {
  const [activePortals, setActivePortals] = useState<DisasterPortal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPortals = async () => {
      try {
        setLoading(true)
        const portals = await getActivePortals()
        setActivePortals(portals)
      } catch (error) {
        console.error("Error fetching active portals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortals()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-love-light to-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-heart-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge className="mb-4 bg-love text-white hover:bg-love-dark">वसुधैव कुटुम्बकम्</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                  Unite in Compassion, <span className="text-primary">Respond as One</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                  Kutumbakam empowers communities to create, coordinate, and contribute to disaster relief efforts in
                  real-time, embodying the spirit of &quot;The World is One Family.&quot;
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button size="lg" className="gap-2" asChild>
                    <Link href="/create-portal">
                      <Heart size={18} />
                      Create Relief Portal
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary text-primary hover:bg-love-light hover:text-primary"
                    asChild
                  >
                    <Link href="/resources">
                      Explore Resources
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-support-light rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-love-light rounded-full opacity-50"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="People helping during disaster relief"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/request-assistance">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-love-light rounded-full flex items-center justify-center mb-4">
                      <Package className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Contribute Resources</h3>
                    <p className="text-gray-600 mb-4">
                      Provide essential supplies and resources to those affected by disasters in your community.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-primary text-primary hover:bg-love-light hover:text-primary"
                    >
                      Contribute Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/volunteer">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-compassion-light rounded-full flex items-center justify-center mb-4">
                      <Users className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Become a Volunteer</h3>
                    <p className="text-gray-600 mb-4">
                      Offer your time and skills to help those affected by disasters in your community or beyond.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-primary text-primary hover:bg-love-light hover:text-primary"
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/create-portal">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-support-light rounded-full flex items-center justify-center mb-4">
                      <Globe className="text-primary h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Create Relief Portal</h3>
                    <p className="text-gray-600 mb-4">
                      Start a coordination hub for disaster relief efforts in your area or for a specific disaster.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-auto border-primary text-primary hover:bg-love-light hover:text-primary"
                    >
                      Create Portal
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-love-light">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-700">Active Relief Portals</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-gray-700">Registered Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">₹2Cr+</div>
                <div className="text-gray-700">Resources Mobilized</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                <div className="text-gray-700">People Helped</div>
              </div>
            </div>
          </div>
        </section>

        {/* Active Portals Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Active Disaster Relief Portals</h2>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/portals">
                  View All
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : activePortals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePortals.map((portal) => (
                  <Card key={portal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <Image 
                        src={portal.image || "/placeholder.svg"} 
                        alt={portal.title}
                        fill
                        className="object-cover"
                      />
                      <Badge 
                        variant={portal.urgency === "high" ? "destructive" : "outline"}
                        className="absolute top-3 right-3"
                      >
                        {portal.urgency === "high" ? "Urgent" : "Active"}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>{portal.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin size={14} />
                        {portal.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2 mb-4">{portal.description}</p>
                      <div className="flex justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span>Volunteers needed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Package size={14} />
                          <span>Resources needed</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        Created {portal.createdAt ? new Date(portal.createdAt.toDate()).toLocaleDateString() : 'Recently'}
                      </div>
                      <Button size="sm" asChild>
                        <Link href={`/portal/${portal.id}`}>
                          View Portal
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-gray-500 mb-4">No active disaster relief portals at the moment.</p>
                <Button asChild>
                  <Link href="/create">Create a Portal</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* New Resources Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Resource Needs</h2>
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/resources">
                  View All Resources
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-red-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Package className="text-red-600 h-4 w-4" />
                    </div>
                    High Priority Needs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-red-600 text-xs font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Medical Supplies</h4>
                        <p className="text-sm text-gray-600">First aid kits, bandages, antiseptics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-red-600 text-xs font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Clean Drinking Water</h4>
                        <p className="text-sm text-gray-600">Bottled water, water purification tablets</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-red-600 text-xs font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Emergency Food</h4>
                        <p className="text-sm text-gray-600">Non-perishable food items, baby food</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" size="sm" asChild>
                    <Link href="/resources?priorityFilter=high">View High Priority Needs</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-yellow-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Package className="text-yellow-600 h-4 w-4" />
                    </div>
                    Medium Priority Needs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-yellow-600 text-xs font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Hygiene Kits</h4>
                        <p className="text-sm text-gray-600">Soap, toothpaste, sanitary products</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-yellow-600 text-xs font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Blankets & Bedding</h4>
                        <p className="text-sm text-gray-600">Blankets, sleeping bags, mattresses</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-yellow-600 text-xs font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Baby Supplies</h4>
                        <p className="text-sm text-gray-600">Diapers, formula, baby clothes</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" size="sm" variant="outline" asChild>
                    <Link href="/resources?priorityFilter=medium">View Medium Priority Needs</Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="bg-blue-50 border-b">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="text-blue-600 h-4 w-4" />
                    </div>
                    Volunteer Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 text-xs font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Medical Professionals</h4>
                        <p className="text-sm text-gray-600">Doctors, nurses, paramedics</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 text-xs font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Logistics Support</h4>
                        <p className="text-sm text-gray-600">Transportation, distribution, coordination</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-blue-600 text-xs font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">General Volunteers</h4>
                        <p className="text-sm text-gray-600">Relief distribution, shelter management</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full" size="sm" variant="outline" asChild>
                    <Link href="/volunteer">Register as Volunteer</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-2 bg-love text-white hover:bg-love-dark">Impact Stories</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Real stories of communities coming together through Kutumbakam to overcome disasters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story) => (
                <Card key={story.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
                  <div className="relative h-48 w-full">
                    <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>{story.impact}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{story.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="w-full justify-between text-primary hover:text-primary hover:bg-love-light"
                    >
                      Read Full Story
                      <ArrowRight size={16} />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-love-light">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-2 bg-primary text-white hover:bg-love-dark">Testimonials</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Voices from the Community</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Hear from those who have experienced the power of community-driven disaster relief
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">RS</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Rajesh Singh</h4>
                      <p className="text-sm text-gray-600">Volunteer, Kerala Floods</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                  &quot;Kutumbakam made it easy to find where help was needed most. The real-time updates and clear
                    categorization of needs helped us direct our efforts effectively.&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">AP</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Ananya Patel</h4>
                      <p className="text-sm text-gray-600">Relief Coordinator, Cyclone Amphan</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                  &quot;As a coordinator, I was able to quickly set up a portal and connect with volunteers across the
                    region. The platform&apos;s transparency built trust with donors and those affected.&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">MK</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold">Meera Kumar</h4>
                      <p className="text-sm text-gray-600">Affected Resident, Uttarakhand</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                  &quot;During the landslides, Kutumbakam helped our community receive timely aid. The platform connected
                    us directly with people who wanted to help, without bureaucracy or delays.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-love-light via-white to-support-light relative overflow-hidden">
          <div className="absolute inset-0 bg-heart-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary text-white hover:bg-love-dark">Join The Movement</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Be Part of the <span className="text-primary">Kutumbakam</span> Community
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Whether you&apos;re creating a relief portal, volunteering your skills, or contributing resources, your
                participation makes a difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="gap-2">
                  <Heart size={18} fill="currentColor" />
                  Create Relief Portal
                </Button>
                <Link href="/volunteer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-primary text-primary hover:bg-love-light hover:text-primary"
                  >
                    <Heart size={18} />
                    Become a Volunteer
                  </Button>
                </Link>
              </div>
              <p className="text-gray-600 mt-8 text-sm">
              &quot;वसुधैव कुटुम्बकम्&quot; — The world is one family. Together, we can overcome any disaster.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

