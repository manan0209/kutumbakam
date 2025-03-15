import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, MessageSquare } from "lucide-react"

interface VolunteerProps {
  volunteer: {
    id: string
    name: string
    role: string
    location: string
    joinedAt: string
    status: string
    skills: string[]
  }
}

export function VolunteerCard({ volunteer }: VolunteerProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{volunteer.name}</h3>
            <div className="text-gray-600">{volunteer.role}</div>
          </div>
          <Badge
            variant={volunteer.status === "active" ? "outline" : "secondary"}
            className={volunteer.status === "active" ? "bg-love-light text-love border-love hover:bg-love-light" : ""}
          >
            {volunteer.status === "active" ? "Active" : volunteer.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={14} className="mr-2" />
            {volunteer.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={14} className="mr-2" />
            Joined {volunteer.joinedAt}
          </div>

          <div className="pt-2">
            <div className="text-sm font-medium mb-2">Skills</div>
            <div className="flex flex-wrap gap-1">
              {volunteer.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="font-normal bg-compassion-light text-primary border-primary hover:bg-compassion-light"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <button className="flex items-center text-sm text-primary hover:text-love-dark mt-2">
            <MessageSquare size={14} className="mr-1" />
            Contact Volunteer
          </button>
        </div>
      </CardContent>
    </Card>
  )
}

