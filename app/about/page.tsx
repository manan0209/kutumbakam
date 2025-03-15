import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Globe, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-saffron-light to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                About Us
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Mission & Philosophy
              </h1>
              <p className="text-xl text-gray-600">
                Kutumbakam is built on the ancient Sanskrit philosophy of
                &ldquo;वसुधैव कुटुम्बकम्&rdquo; (Vasudhaiva Kutumbakam) —
                &ldquo;The world is one family.&rdquo; We believe in the power
                of community-driven disaster response.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Our Story
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Addressing Disaster Relief Challenges
                </h2>
                <p className="text-gray-600 mb-4">
                  Kutumbakam was born from observing the critical coordination
                  challenges that occur during disaster response situations
                  across India and globally. When disasters strike, the
                  outpouring of support is often hindered by poor resource
                  allocation and communication gaps.
                </p>
                <p className="text-gray-600 mb-4">
                  We created Kutumbakam as a hackathon project to tackle the
                  fundamental problem: How can we connect volunteers, resources,
                  and those in need more efficiently during disaster situations?
                </p>
                <p className="text-gray-600">
                  Our platform aims to bridge these coordination gaps by
                  providing real-time communication channels, resource tracking,
                  and volunteer management tools that can be deployed rapidly
                  when disasters strike.
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
              <Badge className="mb-4 bg-chakraBlue text-white hover:bg-chakraBlue-dark">
                Our Values
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Guided by Compassion & Transparency
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform is built on core values that reflect the essence of
                Vasudhaiva Kutumbakam
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
                    We believe in the inherent goodness of people and their
                    desire to help others in times of need.
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
                    We empower local communities to lead their own relief
                    efforts with the support of a global network.
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
                    We provide real-time visibility into resource allocation and
                    needs to build trust and accountability.
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
                    We design our platform to be accessible to all, regardless
                    of technical expertise or background.
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
              <Badge className="mb-4 bg-saffron text-white hover:bg-saffron-dark">
                Our Team
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Behind Kutumbakam
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                This hackathon project was created to address the critical
                challenge of disaster relief coordination
              </p>
            </div>

            <div className="flex justify-center">
              {/* Team Member */}
              <div className="text-center max-w-sm">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Manan Goel"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Manan Goel</h3>
                <p className="text-gray-600 mb-2">Creator & Developer</p>
                <p className="text-sm text-gray-600 max-w-xs mx-auto">
                  Passionate about using technology to solve critical social
                  challenges and improve disaster response coordination.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                This project was developed as part of a hackathon focused on
                disaster relief coordination solutions.
              </p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="gap-2 border-primary text-primary hover:bg-saffron-light hover:text-primary"
                >
                  Connect With Me
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Solution Approach Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Badge className="mb-4 bg-indiaGreen text-white hover:bg-indiaGreen-dark">
                  Our Solution
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Bridging Coordination Gaps
                </h2>
                <p className="text-gray-600 mb-4">
                  Kutumbakam addresses the disaster relief coordination
                  challenge through several innovative features:
                </p>
                <p className="text-gray-600 mb-4">
                  • Real-time resource mapping and tracking to efficiently
                  allocate supplies
                  <br />
                  • Volunteer management system with skill matching to deploy
                  help where it&apos;s most needed
                  <br />
                  • Direct communication channels between relief coordinators
                  and affected communities
                  <br />• Need assessment tools to prioritize response efforts
                </p>
                <p className="text-gray-600">
                  Our platform aims to minimize response time and maximize the
                  impact of available resources during critical disaster
                  situations.
                </p>
                <div className="mt-6">
                  <Link href="/features">
                    <Button className="gap-2 bg-primary hover:bg-saffron-dark">
                      Explore Our Features
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
                  alt="Disaster coordination platform interface"
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
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Join Our Mission for Better Disaster Response
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Help us build a more coordinated disaster relief ecosystem that
                connects volunteers, resources, and those in need.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-saffron-dark"
                >
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
  );
}
