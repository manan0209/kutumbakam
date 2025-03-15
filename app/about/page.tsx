import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Globe, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-saffron-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">About Us</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Mission & Philosophy</h1>
              <p className="text-xl text-gray-600">
                Kutumbakam is built on the ancient Sanskrit philosophy of "वसुधैव कुटुम्बकम्" (Vasudhaiva Kutumbakam) — "The
                world is one family." We believe in the power of community-driven disaster response.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">Our Story</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Born from Community Resilience</h2>
                <p className="text-gray-600 mb-4">
                  Kutumbakam was born from the experiences of the 2018 Kerala floods, where we witnessed both the
                  devastating impact of natural disasters and the incredible power of community-led relief efforts.
                </p>
                <p className="text-gray-600 mb-4">
                  Despite the outpouring of support, coordination challenges hindered effective distribution of
                  resources and volunteer efforts. We saw the need for a platform that could connect those who want to
                  help directly with those who need it most.
                </p>
                <p className="text-gray-600">
                  Founded by a team of disaster management experts, technologists, and community organizers, Kutumbakam
                  aims to democratize disaster relief by providing the tools for anyone to create, coordinate, and
                  contribute to relief efforts.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-chakraBlue-light rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-saffron-light rounded-full opacity-50"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Community members working together during disaster relief"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">Our Values</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Guided by Compassion & Transparency</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform is built on core values that reflect the essence of Vasudhaiva Kutumbakam
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-saffron-light rounded-full flex items-center justify-center mb-6">
                    <Heart className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                  <p className="text-gray-600">
                    We believe in the inherent goodness of people and their desire to help others in times of need.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-indiaGreen-light rounded-full flex items-center justify-center mb-6">
                    <Users className="text-secondary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-600">
                    We empower local communities to lead their own relief efforts with the support of a global network.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-chakraBlue-light rounded-full flex items-center justify-center mb-6">
                    <Globe className="text-accent" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                  <p className="text-gray-600">
                    We provide real-time visibility into resource allocation and needs to build trust and
                    accountability.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Shield className="text-gray-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                  <p className="text-gray-600">
                    We design our platform to be accessible to all, regardless of technical expertise or background.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">Our Team</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The People Behind Kutumbakam</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our diverse team brings together expertise in disaster management, technology, and community organizing
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Arjun Sharma"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Arjun Sharma</h3>
                <p className="text-gray-600 mb-2">Founder & Director</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Former disaster management officer with 15 years of experience in coordinating relief efforts.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Priya Mehta"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Priya Mehta</h3>
                <p className="text-gray-600 mb-2">Technology Lead</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Tech entrepreneur with a passion for using technology to solve social challenges.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Rahul Verma"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Rahul Verma</h3>
                <p className="text-gray-600 mb-2">Community Relations</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Community organizer with extensive experience in volunteer management and grassroots mobilization.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Our team is supported by a network of advisors, volunteers, and community partners across India.
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-saffron-light hover:text-primary"
                >
                  Get in Touch With Our Team
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">Our Impact</Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Making a Difference Together</h2>
                <p className="text-gray-600 mb-4">
                  Since our launch, Kutumbakam has facilitated relief efforts for over 20 major disasters across India,
                  connecting more than 10,000 volunteers with communities in need.
                </p>
                <p className="text-gray-600 mb-4">
                  Our platform has helped mobilize resources worth over ₹2 crores, including food, water, medical
                  supplies, and shelter materials.
                </p>
                <p className="text-gray-600">
                  But beyond the numbers, our greatest impact is in the stories of communities coming together, of
                  strangers becoming allies, and of the resilience that emerges when we act as one family.
                </p>
                <div className="mt-6">
                  <Link href="/success-stories">
                    <Button className="gap-2 bg-primary hover:bg-saffron-dark">
                      Read Our Impact Stories
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-chakraBlue-light rounded-full opacity-50"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-saffron-light rounded-full opacity-50"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Impact of disaster relief efforts"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-saffron-light via-white to-chakraBlue-light">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us in Building a More Resilient World</h2>
              <p className="text-xl text-gray-600 mb-8">
                Whether you're creating a relief portal, volunteering your skills, or contributing resources, your
                participation makes a difference.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="gap-2 bg-primary hover:bg-saffron-dark">
                  Create Relief Portal
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-saffron-light hover:text-primary"
                >
                  Become a Volunteer
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

