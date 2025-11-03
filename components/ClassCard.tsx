import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ClassCardProps {
  id?: string;
  subject: string;
  code: string;
  time: string;
  duration: string;
  faculity: string;
  location: string;
  type?: "lecture" | "lab" | "tutorial"; // 👈 made optional
  isUpcoming?: boolean;
  onClick?: (data: any) => void;
}

const typeColors = {
  lecture: "bg-primary/10 text-primary border-primary/20",
  lab: "bg-secondary/10 text-secondary border-secondary/20",
  tutorial: "bg-accent/10 text-accent border-accent/20",
};

export const ClassCard = ({
  id,
  subject,
  code,
  time,
  duration,
  faculity,
  location,
  type,
  isUpcoming = false,
  onClick,
}: ClassCardProps) => {
  return (
    <div
      onClick={() =>
        onClick?.({ id, subject, code, time, duration, faculity, location, type })
      }
      className="cursor-pointer"
    >
      <Card
        className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
          isUpcoming ? "border-primary border-2 shadow-md" : ""
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-foreground mb-1">{subject}</h3>
              <p className="text-sm text-muted-foreground">{code}</p>
            </div>
            <Badge
              variant="outline"
              className={type ? typeColors[type] : "bg-gray-100 text-gray-500"}
            >
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : "N/A"}
            </Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-medium text-foreground">{time}</span>
              <span>• {duration}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{faculity}</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
