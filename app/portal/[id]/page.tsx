"use client"

import { PortalDashboard } from "@/components/portal-dashboard"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import React, { useState } from 'react'

// Mock data for the disaster portal
const portalData = {
  id: "1",
  title: "Kerala Flood Relief",
  location: "Kerala, India",
  description:
    "Coordinating relief efforts for the recent floods in Kerala that have affected over 100,000 people across 6 districts. This portal serves as the central coordination hub for all volunteer efforts, resource allocation, and information sharing.",
  createdAt: "August 15, 2023",
  updatedAt: "10 minutes ago",
  urgency: "high",
  status: "active",
  coordinator: {
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@example.org",
  },
  stats: {
    volunteers: 245,
    resourcesNeeded: 28,
    resourcesFulfilled: 18,
    affectedAreas: 6,
    peopleHelped: 4500,
  },
  image: "/placeholder.svg?height=400&width=800",
}

// Mock data for resource needs
const resourceNeeds = [
  {
    id: "r1",
    category: "Food & Water",
    title: "Drinking Water",
    description: "Clean drinking water in 1L bottles or larger containers",
    quantity: 5000,
    fulfilled: 3200,
    urgency: "high",
    location: "Wayanad District",
  },
  {
    id: "r2",
    category: "Medical",
    title: "First Aid Kits",
    description: "Basic first aid kits with bandages, antiseptics, and pain relievers",
    quantity: 500,
    fulfilled: 320,
    urgency: "high",
    location: "Idukki District",
  },
  {
    id: "r3",
    category: "Shelter",
    title: "Tarpaulins",
    description: "Waterproof tarpaulins for temporary shelter, minimum 12x12 feet",
    quantity: 1000,
    fulfilled: 450,
    urgency: "medium",
    location: "Ernakulam District",
  },
  {
    id: "r4",
    category: "Hygiene",
    title: "Sanitary Kits",
    description: "Hygiene kits including soap, toothpaste, sanitary pads, etc.",
    quantity: 2000,
    fulfilled: 800,
    urgency: "medium",
    location: "Multiple Districts",
  },
]

// Mock data for volunteers
const volunteers = [
  {
    id: "v1",
    name: "Rahul Menon",
    role: "Medical Volunteer",
    location: "Kochi",
    joinedAt: "2 days ago",
    status: "active",
    skills: ["Doctor", "First Aid", "Coordination"],
  },
  {
    id: "v2",
    name: "Ananya Patel",
    role: "Distribution Coordinator",
    location: "Thrissur",
    joinedAt: "3 days ago",
    status: "active",
    skills: ["Logistics", "Inventory Management"],
  },
  {
    id: "v3",
    name: "Mohammed Salim",
    role: "Rescue Operations",
    location: "Wayanad",
    joinedAt: "1 day ago",
    status: "active",
    skills: ["Boat Operator", "Swimming", "First Aid"],
  },
]

// Mock data for updates
const updates = [
  {
    id: "u1",
    title: "New Relief Camp Established",
    content: "A new relief camp has been set up at St. Mary's School in Wayanad district with capacity for 500 people.",
    author: "Priya Sharma",
    timestamp: "2 hours ago",
    type: "announcement",
  },
  {
    id: "u2",
    title: "Medical Team Deployed",
    content: "A team of 12 doctors and nurses has been deployed to Idukki district to provide medical assistance.",
    author: "Dr. Rahul Menon",
    timestamp: "5 hours ago",
    type: "update",
  },
  {
    id: "u3",
    title: "Urgent: Need Boat Operators",
    content: "We urgently need experienced boat operators to help with rescue operations in Wayanad district.",
    author: "Mohammed Salim",
    timestamp: "8 hours ago",
    type: "urgent",
  },
]

export default function PortalPage({ params }: { params: { id: string } }) {
  // Unwrap params with React.use()
  const unwrappedParams = React.use(params);
  const [isSubscribed, setIsSubscribed] = useState(true)
  const [copied, setCopied] = useState(false)

  const portalUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyPortalLink = () => {
    navigator.clipboard.writeText(portalUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-6">
        <PortalDashboard portalId={unwrappedParams.id} />
      </main>
      <SiteFooter />
    </div>
  )
}

