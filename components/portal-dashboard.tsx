"use client"

import { PortalShareCard } from "@/components/portal-share-card"
import { SocialShare } from "@/components/social-share"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdateCard } from "@/components/update-card"
import { VolunteerCard } from "@/components/volunteer-card"
import { useAuth } from "@/lib/auth-context"
import {
    DisasterPortal,
    getPortal,
    getResourceNeeds,
    getUpdates,
    getVolunteers,
    ResourceNeed,
    Update,
    Volunteer
} from "@/lib/db"
import { AlertTriangle, ArrowUpRight, CheckCircle2, Clock, MapPin, Package, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"

interface PortalDashboardProps {
  portalId: string
}

export function PortalDashboard({ portalId }: PortalDashboardProps) {
  const [timeRange, setTimeRange] = useState("7d")
  const [portal, setPortal] = useState<DisasterPortal | null>(null)
  const [resourceNeeds, setResourceNeeds] = useState<ResourceNeed[]>([])
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchPortalData = async () => {
      try {
        setLoading(true)
        const portalData = await getPortal(portalId)
        const resourcesData = await getResourceNeeds(portalId)
        const volunteersData = await getVolunteers(portalId)
        const updatesData = await getUpdates(portalId)
        
        setPortal(portalData)
        setResourceNeeds(resourcesData)
        setVolunteers(volunteersData)
        setUpdates(updatesData)
      } catch (error) {
        console.error("Error fetching portal data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (portalId) {
      fetchPortalData()
    }
  }, [portalId])

  // Calculate resource stats
  const totalResourceNeeds = resourceNeeds.length
  const fulfilledResourceNeeds = resourceNeeds.filter(r => r.status === "fulfilled").length
  const partiallyFulfilledResourceNeeds = resourceNeeds.filter(r => r.status === "partially_fulfilled").length
  const neededResourceNeeds = resourceNeeds.filter(r => r.status === "needed").length
  
  const urgentResourceNeeds = resourceNeeds
    .filter(r => r.priority === "high" && r.status !== "fulfilled")
    .slice(0, 3)
  
  // Group resources by category
  const resourceCategories = resourceNeeds.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = { total: 0, fulfilled: 0 }
    }
    
    acc[resource.category].total++
    if (resource.status === "fulfilled") {
      acc[resource.category].fulfilled++
    } else if (resource.status === "partially_fulfilled") {
      acc[resource.category].fulfilled += 0.5
    }
    
    return acc
  }, {} as Record<string, { total: number, fulfilled: number }>)

  // Calculate volunteers by skills
  const volunteerSkills = volunteers.reduce((acc, volunteer) => {
    volunteer.skills.forEach(skill => {
      if (!acc[skill]) {
        acc[skill] = 0
      }
      acc[skill]++
    })
    return acc
  }, {} as Record<string, number>)
  
  // Format volunteer skills for display
  const volunteerSkillsFormatted = Object.entries(volunteerSkills)
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!portal) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Portal Not Found</h2>
        <p className="text-gray-600 mb-6">
          The disaster relief portal you're looking for could not be found or may have been removed.
        </p>
        <Button asChild>
          <a href="/">Return to Home</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{portal.title} Dashboard</h2>
        <div className="flex items-center gap-2">
          <SocialShare
            title={portal.title}
            description={portal.description}
            url={typeof window !== "undefined" ? window.location.href : ""}
            variant="icon"
          />
          <PortalShareCard portal={portal} variant="icon" />
          <span className="text-sm text-gray-600">Time Range:</span>
          <div className="flex border rounded-md overflow-hidden">
            <button 
              className={`px-3 py-1 text-sm ${timeRange === "24h" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
              onClick={() => setTimeRange("24h")}
            >
              24h
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeRange === "7d" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
              onClick={() => setTimeRange("7d")}
            >
              7d
            </button>
            <button 
              className={`px-3 py-1 text-sm ${timeRange === "30d" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
              onClick={() => setTimeRange("30d")}
            >
              30d
            </button>
          </div>
        </div>
      </div>
      
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Volunteers</p>
                <h3 className="text-2xl font-bold">{volunteers.length}</h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>Active & Ready</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="text-green-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Resources Fulfilled</p>
                <h3 className="text-2xl font-bold">{fulfilledResourceNeeds}/{totalResourceNeeds}</h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>{partiallyFulfilledResourceNeeds} partially filled</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Package className="text-orange-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Updates Posted</p>
                <h3 className="text-2xl font-bold">{updates.length}</h3>
                <div className="flex items-center text-xs text-green-600 mt-1">
                  <TrendingUp size={14} className="mr-1" />
                  <span>Latest {updates.length > 0 ? new Date(updates[0].createdAt?.toDate()).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <ArrowUpRight className="text-blue-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <h3 className="text-lg font-bold">{portal.location}</h3>
                <div className="flex items-center text-xs text-gray-600 mt-1">
                  <Clock size={14} className="mr-1" />
                  <span>Urgency: {portal.urgency}</span>
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <MapPin className="text-gray-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="resources">Resource Status</TabsTrigger>
          <TabsTrigger value="volunteers">Volunteer Activity</TabsTrigger>
          <TabsTrigger value="updates">Latest Updates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Resource Fulfillment by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(resourceCategories).map(([category, data]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
                      <div className="text-sm text-gray-500">
                        {Math.round(data.fulfilled)}/{data.total} ({Math.round((data.fulfilled/data.total)*100)}%)
                      </div>
                    </div>
                    <Progress value={(data.fulfilled/data.total)*100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Urgent Resource Needs</CardTitle>
              </CardHeader>
              <CardContent>
                {urgentResourceNeeds.length > 0 ? (
                <div className="space-y-4">
                    {urgentResourceNeeds.map(resource => (
                      <div key={resource.id} className="flex items-start gap-3">
                    <AlertTriangle size={18} className="text-red-500 mt-0.5" />
                    <div>
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-gray-600">{resource.description}</div>
                      <div className="text-sm text-gray-500 mt-1">
                            {resource.status === "partially_fulfilled" ? "Partially fulfilled" : "Not fulfilled yet"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No urgent resource needs at this time</p>
                )}
                
                <Button variant="outline" className="w-full mt-4" asChild>
                  <a href={`/request-assistance?portalId=${portalId}`}>Contribute Resources</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Add New Resource Need</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Are you coordinating relief efforts? Add new resource needs to the portal to help
                  organize donations and assistance.
                </p>
                
                <Button className="w-full" asChild>
                  <a href={`/portal/${portalId}/add-resource`}>Add Resource Need</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm">Ananya contributed 200 water bottles</div>
                      <div className="text-xs text-gray-500">30 minutes ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm">Reliance Foundation donated 50 first aid kits</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm">Local NGO provided 20 tarpaulins</div>
                      <div className="text-xs text-gray-500">3 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm">Rahul contributed 100 hygiene kits</div>
                      <div className="text-xs text-gray-500">5 hours ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="volunteers" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Volunteer Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {volunteerSkillsFormatted.map(({ skill, count }) => (
                    <div key={skill} className="flex items-center justify-between">
                      <div className="font-medium">{skill}</div>
                      <Badge variant="outline">{count} volunteers</Badge>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-6" asChild>
                  <a href={`/volunteer?portalId=${portalId}`}>Become a Volunteer</a>
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Volunteers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {volunteers.slice(0, 5).map(volunteer => (
                    <div key={volunteer.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{volunteer.name}</div>
                        <div className="text-sm text-gray-500">{volunteer.skills.join(", ")}</div>
                      </div>
                      <Badge>{new Date(volunteer.registeredAt?.toDate()).toLocaleDateString()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">All Volunteers ({volunteers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {volunteers.slice(0, 6).map(volunteer => (
                  <VolunteerCard 
                    key={volunteer.id} 
                    volunteer={volunteer} 
                    portalName={portal.title}
                  />
                ))}
              </div>
              
              {volunteers.length > 6 && (
                <Button variant="outline" className="w-full mt-6" asChild>
                  <a href={`/portal/${portalId}/volunteers`}>View All Volunteers</a>
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="updates" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Latest Updates</CardTitle>
                <Button variant="outline" asChild>
                  <a href={`/portal/${portalId}/post-update`}>Post Update</a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {updates.length > 0 ? (
                <div className="space-y-6">
                  {updates.map(update => (
                    <UpdateCard key={update.id} update={update} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No updates have been posted yet.</p>
                  {user && (
                    <Button asChild>
                      <a href={`/portal/${portalId}/post-update`}>Post the First Update</a>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

