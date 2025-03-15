"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Volunteer } from "@/lib/db"
import { Download, QrCode, User } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { SocialShare } from "./social-share"
import { Badge } from "./ui/badge"

interface VolunteerShareCardProps {
  volunteer: Volunteer
  portalName: string
  variant?: "button" | "icon" | "inline"
  className?: string
}

export function VolunteerShareCard({
  volunteer,
  portalName,
  variant = "button",
  className = "",
}: VolunteerShareCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const cardRef = useRef<HTMLDivElement>(null)
  const volunteerUrl = typeof window !== "undefined" ? `${window.location.origin}/portal/${volunteer.portalId}/volunteers/${volunteer.id}` : ""

  useEffect(() => {
    if (volunteer.id) {
      // Generate QR code URL using a free QR code API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(volunteerUrl)}`
      setQrCodeUrl(qrUrl)
    }
  }, [volunteer.id, volunteerUrl])

  const downloadCard = async () => {
    if (!cardRef.current) return
    
    try {
      // Dynamically import html2canvas only when needed
      const html2canvasModule = await import('html2canvas')
      const html2canvas = html2canvasModule.default
      
      const canvas = await html2canvas(cardRef.current)
      const image = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = image
      link.download = `${volunteer.name.replace(/\s+/g, '-').toLowerCase()}-volunteer-card.png`
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
      // Fallback - just open the URL
      window.open(volunteerUrl, "_blank")
    }
  }

  const registeredDate = volunteer.registeredAt?.toDate 
    ? new Date(volunteer.registeredAt.toDate()).toLocaleDateString() 
    : 'N/A';

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button className={`gap-2 ${className}`}>
            <QrCode size={16} />
            Volunteer Card
          </Button>
        ) : variant === "icon" ? (
          <Button variant="ghost" size="icon" className={className}>
            <QrCode size={20} />
            <span className="sr-only">Volunteer Card</span>
          </Button>
        ) : (
          <div className="cursor-pointer text-primary hover:underline">Generate Volunteer Card</div>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Volunteer Identity Card</DialogTitle>
          <DialogDescription>
            Download or share your volunteer card for {portalName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* The shareable card */}
          <div 
            ref={cardRef} 
            className="relative overflow-hidden bg-white border border-gray-200 rounded-lg p-6 shadow-lg mx-auto w-full max-w-2xl"
            style={{ aspectRatio: "16/9" }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500"></div>
            
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Volunteer ID: {volunteer.id?.substring(0, 8)}</div>
                  <div className="text-xl font-bold flex items-center">
                    <User size={18} className="text-green-600 mr-2" />
                    {volunteer.name}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    Registered on {registeredDate}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Official Volunteer
                </Badge>
              </div>
              
              <div className="flex-grow mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <div className="text-gray-500">Portal:</div>
                    <div className="font-medium">{portalName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Contact:</div>
                    <div className="font-medium">{volunteer.email}</div>
                    {volunteer.phone && <div className="font-medium">{volunteer.phone}</div>}
                  </div>
                  <div>
                    <div className="text-gray-500">Skills:</div>
                    <div className="font-medium">{volunteer.skills.join(", ")}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Availability:</div>
                    <div className="font-medium line-clamp-2">{volunteer.availability}</div>
                  </div>
                </div>
                
                <div className="mt-auto grid grid-cols-3 gap-4">
                  <div className="col-span-2 text-sm text-gray-600">
                    <div className="text-xs text-gray-500 mb-1">Scan QR code to verify:</div>
                    <div className="font-medium break-all">{volunteerUrl}</div>
                    <div className="mt-4 text-xs">
                      Created by Kutumbakam - A Disaster Relief Coordination Portal
                    </div>
                  </div>
                  
                  <div className="flex justify-end items-end">
                    {qrCodeUrl && (
                      <div className="relative w-24 h-24">
                        <Image 
                          src={qrCodeUrl} 
                          alt="QR Code" 
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <SocialShare 
              title="Volunteer Card" 
              description={`${volunteer.name} is an official volunteer for ${portalName}`} 
              url={volunteerUrl}
            />
            
            <Button onClick={downloadCard} className="gap-2">
              <Download size={16} />
              Download Card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 