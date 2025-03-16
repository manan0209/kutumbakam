"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Volunteer } from "@/lib/db"
import { Timestamp } from "firebase/firestore"
import { CalendarClock, Mail, Phone, User2 } from "lucide-react"
import { Badge } from "./ui/badge"
import { VolunteerShareCard } from "./volunteer-share-card"

interface VolunteerCardProps {
  volunteer: Volunteer
  portalName?: string
  minimal?: boolean
}

export function VolunteerCard({ volunteer, portalName = "", minimal = false }: VolunteerCardProps) {
  let registeredDate = 'N/A';
  
  if (volunteer.registeredAt) {
    // Check if it's a Firestore Timestamp object
    if (volunteer.registeredAt instanceof Timestamp) {
      registeredDate = volunteer.registeredAt.toDate().toLocaleDateString();
    } 
    // Otherwise handle it based on its type
    else {
      // Convert to appropriate type without using 'any'
      const timestamp = volunteer.registeredAt as (string | number | Date);
      registeredDate = new Date(timestamp).toLocaleDateString();
    }
  }

  if (minimal) {
    return (
      <div className="flex items-center justify-between p-3 border rounded-lg gap-4 bg-white">
        <div>
          <h4 className="font-medium">{volunteer.name}</h4>
          <p className="text-sm text-gray-500 mt-0.5">{volunteer.skills.join(", ")}</p>
        </div>
        <Badge variant="outline">Registered</Badge>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <User2 className="h-4 w-4 mr-2 text-gray-500" />
              {volunteer.name}
            </CardTitle>
            <CardDescription className="mt-1">
              {volunteer.skills.join(", ")}
            </CardDescription>
          </div>
          <VolunteerShareCard 
            volunteer={volunteer} 
            portalName={portalName}
            variant="icon"
          />
        </div>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{volunteer.email}</span>
        </div>
        {volunteer.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{volunteer.phone}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarClock className="h-4 w-4" />
          <span>Registered: {registeredDate}</span>
        </div>
      </CardContent>
    </Card>
  )
}

