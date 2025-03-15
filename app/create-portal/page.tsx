"use client"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { createPortal } from "@/lib/db"
import { AlertCircle, AlertTriangle, CheckCircle, Clock, MapPin, Newspaper, Plus, Upload, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

// Predefined disaster templates
const disasterTemplates = [
  {
    id: "flood",
    title: "Flood Relief Portal",
    description: "Coordinating relief efforts for flood-affected areas. This portal will help organize volunteers, resources, and information sharing for communities impacted by flooding.",
    location: "",
    urgency: "high",
    image: "/templates/flood.jpg"
  },
  {
    id: "earthquake",
    title: "Earthquake Response Portal",
    description: "Emergency coordination for earthquake-affected regions. This portal centralizes rescue operations, medical assistance, shelter arrangements, and essential supplies distribution.",
    location: "",
    urgency: "high",
    image: "/templates/earthquake.jpg"
  },
  {
    id: "cyclone",
    title: "Cyclone Recovery Portal",
    description: "Support network for cyclone-hit communities. This portal facilitates cyclone preparedness, evacuation coordination, post-cyclone rehabilitation, and reconstruction efforts.",
    location: "",
    urgency: "high",
    image: "/templates/cyclone.jpg"
  },
  {
    id: "drought",
    title: "Drought Relief Portal",
    description: "Long-term assistance for drought-affected communities. This portal helps coordinate water distribution, agricultural support, livestock care, and sustainable solutions.",
    location: "",
    urgency: "medium",
    image: "/templates/drought.jpg"
  },
  {
    id: "fire",
    title: "Wildfire Response Portal",
    description: "Coordination hub for wildfire emergency response. This portal manages evacuation information, firefighting resources, relief supplies, and recovery assistance for affected communities.",
    location: "",
    urgency: "high",
    image: "/templates/fire.jpg"
  }
]

// Common Indian locations for disasters
const commonLocations = [
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Hyderabad, Telangana",
  "Pune, Maharashtra",
  "Ahmedabad, Gujarat",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kochi, Kerala",
  "Bhubaneswar, Odisha",
  "Guwahati, Assam",
  "Shimla, Himachal Pradesh",
  "Dehradun, Uttarakhand"
]

export default function CreatePortalPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [customLocation, setCustomLocation] = useState("")
  const [urgency, setUrgency] = useState<"low" | "medium" | "high">("medium")
  const [activeTab, setActiveTab] = useState("template")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [newsClippings, setNewsClippings] = useState<{title: string, source: string, url: string}[]>([])
  const [newsTitle, setNewsTitle] = useState("")
  const [newsSource, setNewsSource] = useState("")
  const [newsUrl, setNewsUrl] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)
  
  const { user } = useAuth()
  const router = useRouter()

  // Update form based on template selection
  useEffect(() => {
    if (selectedTemplate) {
      const template = disasterTemplates.find(t => t.id === selectedTemplate)
      if (template) {
        setTitle(template.title)
        setDescription(template.description)
        setUrgency(template.urgency as "low" | "medium" | "high")
      }
    }
  }, [selectedTemplate])

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      if (images.length + filesArray.length > 5) {
        setError("Maximum 5 images allowed")
        return
      }
      
      setImages(prevImages => [...prevImages, ...filesArray])
      
      // Create URLs for preview
      const newImageUrls = filesArray.map(file => URL.createObjectURL(file))
      setImageUrls(prevUrls => [...prevUrls, ...newImageUrls])
    }
  }

  // Remove an uploaded image
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(imageUrls[index])
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  // Add news clipping
  const addNewsClipping = () => {
    if (newsTitle && newsSource) {
      setNewsClippings([...newsClippings, {title: newsTitle, source: newsSource, url: newsUrl}])
      setNewsTitle("")
      setNewsSource("")
      setNewsUrl("")
    }
  }

  // Remove news clipping
  const removeNewsClipping = (index: number) => {
    setNewsClippings(newsClippings.filter((_, i) => i !== index))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!user) {
      setError("You must be logged in to create a portal")
      return
    }

    // Validate form fields
    if (!title || !description || (!location && !customLocation) || !urgency) {
      setError("Please fill in all required fields")
      return
    }

    const finalLocation = location === "custom" ? customLocation : location

    setLoading(true)

    try {
      // Determine the image to use
      let imageUrl;
      if (images.length > 0) {
        // In a real app, you'd upload these and get the URL
        imageUrl = "/placeholder.svg";
      } else if (selectedTemplate) {
        // Use the template image if a template was selected
        const template = disasterTemplates.find(t => t.id === selectedTemplate);
        imageUrl = template?.image;
      }

      const portalData = {
        title,
        description,
        location: finalLocation,
        urgency,
        createdBy: user.uid,
        status: "active" as const,
        image: imageUrl
      }

      const newPortal = await createPortal(portalData)
      
      setSuccess("Portal created successfully!")
      
      // Redirect to the new portal page
      setTimeout(() => {
        router.push(`/portal/${newPortal.id}`)
      }, 1500)
    } catch (err: any) {
      setError(err.message || "Failed to create portal")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-primary text-white hover:bg-primary/90">New Portal</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Create a Disaster Relief Portal</h1>
              <p className="text-lg text-gray-600">
                Set up a centralized hub to coordinate relief efforts, manage volunteers,
                and distribute resources efficiently during disasters.
              </p>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
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
                  <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
                  <p className="text-gray-600 mb-4">You need to be logged in to create a disaster relief portal.</p>
                  <Button asChild>
                    <a href="/login?redirect=/create-portal">Log In</a>
                  </Button>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <Tabs defaultValue="template" onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="template">Use Template</TabsTrigger>
                      <TabsTrigger value="custom">Custom Portal</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="template" className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {disasterTemplates.map(template => (
                          <Card 
                            key={template.id} 
                            className={`cursor-pointer hover:border-primary transition-colors overflow-hidden ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
                            onClick={() => setSelectedTemplate(template.id)}
                          >
                            <div className="h-36 bg-gray-100 relative">
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                <img 
                                  src={template.image || '/placeholder.svg'} 
                                  alt={template.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <Badge 
                                className={`absolute top-2 right-2 ${
                                  template.urgency === 'high' ? 'bg-red-500' : 
                                  template.urgency === 'medium' ? 'bg-amber-500' : 
                                  'bg-blue-500'
                                }`}
                              >
                                {template.urgency.charAt(0).toUpperCase() + template.urgency.slice(1)}
                              </Badge>
                            </div>
                            <CardHeader className="py-3">
                              <CardTitle className="text-base">{template.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                              <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {selectedTemplate && (
                        <div className="border-t pt-6 mt-6">
                          <h3 className="text-lg font-semibold mb-4">Customize Your Template</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="template-title">Portal Title *</Label>
                              <Input
                                id="template-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a descriptive title for your portal"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="template-location">Location *</Label>
                              <Select value={location} onValueChange={setLocation}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a location or enter custom" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="custom">Custom Location</SelectItem>
                                  {commonLocations.map(loc => (
                                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              {location === "custom" && (
                                <Input
                                  className="mt-2"
                                  placeholder="Enter custom location"
                                  value={customLocation}
                                  onChange={(e) => setCustomLocation(e.target.value)}
                                />
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="template-description">Description *</Label>
                              <Textarea
                                id="template-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe the disaster and relief efforts needed"
                                rows={4}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="custom" className="space-y-6">
                      <form className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="custom-title">Portal Title *</Label>
                          <Input
                            id="custom-title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a descriptive title for your portal"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="custom-location">Location *</Label>
                          <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location or enter custom" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="custom">Custom Location</SelectItem>
                              {commonLocations.map(loc => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {location === "custom" && (
                            <Input
                              className="mt-2"
                              placeholder="Enter custom location"
                              value={customLocation}
                              onChange={(e) => setCustomLocation(e.target.value)}
                            />
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="custom-description">Description *</Label>
                          <Textarea
                            id="custom-description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe the disaster and relief efforts needed"
                            rows={4}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="urgency">Urgency Level *</Label>
                          <Select 
                            value={urgency} 
                            onValueChange={(value) => setUrgency(value as "low" | "medium" | "high")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select urgency level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">
                                <div className="flex items-center">
                                  <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                                  High - Immediate response needed
                                </div>
                              </SelectItem>
                              <SelectItem value="medium">
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 text-amber-500 mr-2" />
                                  Medium - Urgent but not critical
                                </div>
                              </SelectItem>
                              <SelectItem value="low">
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                                  Low - Ongoing situation
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </form>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Images and Media Section */}
                  <div className="border-t pt-6 mt-6">
                    <h3 className="text-lg font-semibold mb-4">Images & Media</h3>
                    
                    <div className="space-y-6">
                      {/* Image Upload */}
                      <div className="space-y-2">
                        <Label>Upload Images (Max 5)</Label>
                        <div className="flex flex-wrap gap-4 mt-2">
                          {imageUrls.map((url, index) => (
                            <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                              <img 
                                src={url} 
                                alt={`Upload ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-gray-800 bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          
                          {images.length < 5 && (
                            <label className="w-24 h-24 border-2 border-dashed rounded flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                              <Upload size={20} className="text-gray-400 mb-1" />
                              <span className="text-xs text-gray-500">Upload</span>
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange}
                                multiple={images.length < 4}
                              />
                            </label>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">Upload images of the affected area or relief efforts (JPEG, PNG)</p>
                      </div>
                      
                      {/* News Clippings */}
                      <div className="space-y-2">
                        <Label>News Clippings</Label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                          {newsClippings.map((news, index) => (
                            <div key={index} className="flex items-start border rounded p-3 bg-gray-50">
                              <Newspaper className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{news.title}</h4>
                                <p className="text-xs text-gray-500">{news.source}</p>
                                {news.url && (
                                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                    Read article
                                  </a>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => removeNewsClipping(index)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          ))}
                          
                          <div className="border rounded p-3 space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <Label htmlFor="news-title" className="text-sm">Title</Label>
                                <Input
                                  id="news-title"
                                  value={newsTitle}
                                  onChange={(e) => setNewsTitle(e.target.value)}
                                  placeholder="News article title"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="news-source" className="text-sm">Source</Label>
                                <Input
                                  id="news-source"
                                  value={newsSource}
                                  onChange={(e) => setNewsSource(e.target.value)}
                                  placeholder="News source (e.g. Times of India)"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="news-url" className="text-sm">URL (Optional)</Label>
                              <Input
                                id="news-url"
                                value={newsUrl}
                                onChange={(e) => setNewsUrl(e.target.value)}
                                placeholder="https://..."
                                className="mt-1"
                              />
                            </div>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={addNewsClipping}
                              disabled={!newsTitle || !newsSource}
                            >
                              <Plus size={16} className="mr-1" />
                              Add News Clipping
                            </Button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">Add relevant news articles about the disaster</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6 mt-6 flex justify-end gap-3">
                    <Button variant="outline" asChild>
                      <Link href="/">Cancel</Link>
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={loading || !title || !description || (location === "custom" ? !customLocation : !location)}
                    >
                      {loading ? "Creating Portal..." : "Create Disaster Relief Portal"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
} 