import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, AlertTriangle } from "lucide-react"

interface ResourceNeedProps {
  resource: {
    id: string
    category: string
    title: string
    description: string
    quantity: number
    fulfilled: number
    urgency: string
    location: string
  }
}

export function ResourceNeedCard({ resource }: ResourceNeedProps) {
  const percentFulfilled = Math.round((resource.fulfilled / resource.quantity) * 100)

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2 bg-gray-50 hover:bg-gray-100">
              {resource.category}
            </Badge>
            <CardTitle className="text-lg flex items-center gap-2">
              {resource.title}
              {resource.urgency === "high" && <AlertTriangle size={16} className="text-red-500" />}
            </CardTitle>
          </div>
          <Badge
            variant={
              resource.urgency === "high" ? "destructive" : resource.urgency === "medium" ? "outline" : "secondary"
            }
            className={resource.urgency === "medium" ? "bg-love-light text-love border-love hover:bg-love-light" : ""}
          >
            {resource.urgency === "high" ? "Urgent" : "Needed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin size={14} className="mr-1" />
          {resource.location}
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{percentFulfilled}% Complete</span>
          </div>
          <Progress value={percentFulfilled} className="h-2" />
          <div className="text-sm text-gray-500">
            {resource.fulfilled} of {resource.quantity} fulfilled
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Contribute</Button>
      </CardFooter>
    </Card>
  )
}

