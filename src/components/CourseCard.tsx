
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string | number;  // Allow either string or number for id
  title: string;
  description: string;
  image?: string;  // Make it optional to match your usage
  category: string;
  instructor: string;
  lessons?: number;  // Make optional if not always present
  duration?: string;  // Make optional if not always present
}

export default function CourseCard({
  id,
  title,
  description,
  image,
  category,
  instructor,
  lessons = 12,
  duration = "6 weeks"
}: CourseCardProps) {
  return (
    <div className="overflow-hidden bg-white rounded-lg course-card-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full"
        />
        <Badge 
          className="absolute top-4 left-4 bg-lms-primary hover:bg-lms-primary/90" 
          variant="secondary"
        >
          {category}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-semibold line-clamp-2" style={{height:"56px"}}>{title}</h3>
        <p className="mb-4 text-gray-600 line-clamp-3">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {lessons} Lessons • {duration}
          </div>
          <div className="text-sm font-medium text-right">
            By {instructor}
          </div>
        </div>
        
        <Button asChild variant="outline" className="w-full group">
          <Link to={`/course/${id}`} className="flex items-center justify-center">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
