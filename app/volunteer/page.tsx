"use client"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { getPortal, registerVolunteer } from "@/lib/db"
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function VolunteerPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [availability, setAvailability] = useState("")
  const [portalId, setPortalId] = useState("")
  const [portalTitle, setPortalTitle] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingPortal, setLoadingPortal] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const id = searchParams.get("portalId")
    if (id) {
      setPortalId(id)
      fetchPortalDetails(id)
    }

    if (user) {
      setName(user.displayName || "")
      setEmail(user.email || "")
    }
  }, [searchParams, user])

  const fetchPortalDetails = async (id: string) => {
    setLoadingPortal(true)
    try {
      const portal = await getPortal(id)
      if (portal) {
        setPortalTitle(portal.title)
      }
    } catch (error) {
      console.error("Error fetching portal details:", error)
    } finally {
      setLoadingPortal(false)
    }
  }

  const handleSkillToggle = (skill: string) => {
    setSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill) 
        : [...prev, skill]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!user) {
      setError("You must be logged in to register as a volunteer")
      return
    }

    if (!name || !email || !portalId || skills.length === 0 || !availability) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      const volunteerData = {
        userId: user.uid,
        portalId,
        name,
        email,
        phone,
        skills,
        availability
      }

      await registerVolunteer(volunteerData)
      setSuccess("Volunteer registration successful!")
      
      // Redirect back to the portal page after a short delay
      setTimeout(() => {
        router.push(`/portal/${portalId}`)
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Failed to register as volunteer")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {portalId && (
            <Link href={`/portal/${portalId}`} className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
              <ArrowLeft size={16} className="mr-2" />
              Back to Portal
            </Link>
          )}

          <h1 className="text-3xl font-bold mb-2">Volunteer Registration</h1>
          <p className="text-gray-600 mb-8">
            {portalTitle 
              ? `Register as a volunteer for ${portalTitle}` 
              : "Register as a volunteer for disaster relief efforts"}
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-100">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {!user ? (
            <div className="text-center p-6 bg-gray-50 rounded-lg border mb-6">
              <p className="text-gray-600 mb-4">You need to be logged in to register as a volunteer.</p>
              <Button asChild>
                <a href={`/login?redirect=/volunteer${portalId ? `?portalId=${portalId}` : ''}`}>Log In</a>
              </Button>
            </div>
          ) : loadingPortal ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border">
              {!portalId && (
                <div className="space-y-2">
                  <Label htmlFor="portalId">Portal ID *</Label>
                  <Input
                    id="portalId"
                    placeholder="Enter the ID of the disaster relief portal"
                    value={portalId}
                    onChange={(e) => setPortalId(e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    You can find the Portal ID in the URL of the disaster relief portal page.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Skills & Expertise *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="medical" 
                      checked={skills.includes("Medical")}
                      onCheckedChange={() => handleSkillToggle("Medical")}
                    />
                    <Label htmlFor="medical" className="text-sm font-normal">Medical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="logistics" 
                      checked={skills.includes("Logistics")}
                      onCheckedChange={() => handleSkillToggle("Logistics")}
                    />
                    <Label htmlFor="logistics" className="text-sm font-normal">Logistics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rescue" 
                      checked={skills.includes("Rescue")}
                      onCheckedChange={() => handleSkillToggle("Rescue")}
                    />
                    <Label htmlFor="rescue" className="text-sm font-normal">Rescue</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="distribution" 
                      checked={skills.includes("Distribution")}
                      onCheckedChange={() => handleSkillToggle("Distribution")}
                    />
                    <Label htmlFor="distribution" className="text-sm font-normal">Distribution</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="coordination" 
                      checked={skills.includes("Coordination")}
                      onCheckedChange={() => handleSkillToggle("Coordination")}
                    />
                    <Label htmlFor="coordination" className="text-sm font-normal">Coordination</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="technical" 
                      checked={skills.includes("Technical")}
                      onCheckedChange={() => handleSkillToggle("Technical")}
                    />
                    <Label htmlFor="technical" className="text-sm font-normal">Technical</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability *</Label>
                <Textarea
                  id="availability"
                  placeholder="Please describe your availability (e.g., weekends, evenings, full-time, etc.)"
                  rows={3}
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  required
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Register as Volunteer"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

