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
import { DisasterPortal } from "@/lib/db"
import { AlertTriangle, Download, MapPin, QrCode } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { SocialShare } from "./social-share"
import { Badge } from "./ui/badge"

interface PortalShareCardProps {
  portal: DisasterPortal
  variant?: "button" | "icon" | "inline"
  className?: string
}

export function PortalShareCard({
  portal,
  variant = "button",
  className = "",
}: PortalShareCardProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const cardRef = useRef<HTMLDivElement>(null)
  const portalUrl = typeof window !== "undefined" ? `${window.location.origin}/portal/${portal.id}` : ""

  useEffect(() => {
    if (portal.id) {
      // Generate QR code URL using a free QR code API
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(portalUrl)}`
      setQrCodeUrl(qrUrl)
    }
  }, [portal.id, portalUrl])

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
      link.download = `${portal.title.replace(/\s+/g, '-').toLowerCase()}-relief-portal.png`
      link.click()
    } catch (error) {
      console.error("Error generating image:", error)
      // Fallback - just open the URL
      window.open(portalUrl, "_blank")
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {variant === "button" ? (
          <Button className={`gap-2 ${className}`}>
            <QrCode size={16} />
            Share Card
          </Button>
        ) : variant === "icon" ? (
          <Button variant="ghost" size="icon" className={className}>
            <QrCode size={20} />
            <span className="sr-only">Share Card</span>
          </Button>
        ) : (
          <div className="cursor-pointer text-primary hover:underline">Generate Shareable Card</div>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Shareable Relief Portal Card</DialogTitle>
          <DialogDescription>
            Download or share this card to spread awareness about the relief effort
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* The shareable card */}
          <div 
            ref={cardRef} 
            className="relative overflow-hidden bg-white border border-gray-200 rounded-lg p-6 shadow-lg mx-auto w-full max-w-2xl"
            style={{ aspectRatio: "16/9" }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
            
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xl font-bold">{portal.title}</div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin size={14} className="mr-1" />
                    {portal.location}
                  </div>
                </div>
                <Badge className={`${getUrgencyColor(portal.urgency)}`}>
                  {portal.urgency === "high" && <AlertTriangle size={14} className="mr-1" />}
                  {portal.urgency.charAt(0).toUpperCase() + portal.urgency.slice(1)} Urgency
                </Badge>
              </div>
              
              <div className="flex-grow mt-4">
                <p className="text-gray-700 text-sm line-clamp-4 mb-4">{portal.description}</p>
                
                <div className="mt-auto grid grid-cols-3 gap-4">
                  <div className="col-span-2 text-sm text-gray-600">
                    <div className="text-xs text-gray-500 mb-1">Scan QR code or visit:</div>
                    <div className="font-medium break-all">{portalUrl}</div>
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
              title={portal.title} 
              description={`Disaster relief coordination for ${portal.location}. Urgency: ${portal.urgency}.`} 
              url={portalUrl}
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