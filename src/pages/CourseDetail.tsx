import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListOrdered, Award, BookOpen } from "lucide-react";

// Mock course data 
const coursesData = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "This comprehensive course covers everything you need to know to start building modern, responsive websites from scratch. You'll learn HTML, CSS, and JavaScript fundamentals, as well as best practices for web development. By the end of this course, you'll be able to create your own websites and understand how to use frameworks to accelerate your development.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Programming",
    instructor: "Alex Morgan",
    instructorRole: "Senior Web Developer at TechCorp",
    lessons: 24,
    duration: "8 weeks",
    learningPoints: [
      "Build responsive websites with HTML5 and CSS3",
      "Understand core JavaScript concepts and DOM manipulation",
      "Use modern CSS frameworks like Tailwind and Bootstrap",
      "Create interactive web elements and form validation",
      "Implement best practices for web accessibility and SEO"
    ],
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Web Accessibility"],
    outline: [
      { title: "Introduction to Web Development", lessons: 3 },
      { title: "HTML Fundamentals", lessons: 5 },
      { title: "CSS Styling and Layout", lessons: 6 },
      { title: "JavaScript Basics", lessons: 4 },
      { title: "DOM Manipulation", lessons: 3 },
      { title: "Building Responsive Websites", lessons: 3 }
    ]
  },
  {
    id: "2",
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and experience design through this practical course. Learn to create intuitive, beautiful designs that users love. This course combines theory with hands-on projects to give you real-world experience in designing digital products that solve user problems efficiently.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Design",
    instructor: "Sarah Johnson",
    instructorRole: "UX Design Lead at CreativeStudios",
    lessons: 18,
    duration: "6 weeks",
    learningPoints: [
      "Understand core principles of user-centered design",
      "Create wireframes and prototypes using industry tools",
      "Conduct user research and usability testing",
      "Design efficient user flows and navigation patterns",
      "Apply visual design principles to enhance usability"
    ],
    skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Visual Design"],
    outline: [
      { title: "Introduction to UI/UX Design", lessons: 2 },
      { title: "User Research Methods", lessons: 3 },
      { title: "Wireframing and Information Architecture", lessons: 4 },
      { title: "Visual Design Elements", lessons: 3 },
      { title: "Prototyping and Testing", lessons: 4 },
      { title: "Design Systems", lessons: 2 }
    ]
  },
  // ... other courses
];

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Find the course by id
  const course = coursesData.find(c => c.id === id);
  
  // If course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container px-4 py-16 mx-auto text-center">
          <h1 className="mb-4 text-3xl font-bold">Course Not Found</h1>
          <p className="mb-8 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero 
        title={course.title}
        subtitle={`Instructor: ${course.instructor} • ${course.lessons} Lessons • ${course.duration}`}
        backgroundImage={course.image}
        showButton={false}
        height="large"
      />
      
      {/* Course Overview */}
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-start gap-8 md:flex-row">
          {/* Left Content */}
          <div className="flex-1">
            {/* What You'll Learn Section */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4 gap-2">
                <ListOrdered className="w-6 h-6 text-lms-accent" />
                <h2 className="text-2xl font-bold">What You'll Learn</h2>
              </div>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {course.learningPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-sm text-white bg-lms-accent rounded-full">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Course Description */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Course Description</h2>
              <p className="mb-4 text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </div>
            
            {/* Course Content */}
            <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4 gap-2">
                <BookOpen className="w-6 h-6 text-lms-accent" />
                <h2 className="text-2xl font-bold">Course Content</h2>
              </div>
              <div className="space-y-4">
                {course.outline.map((section, index) => (
                  <div 
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{section.title}</h3>
                      <span className="text-sm text-gray-500">{section.lessons} lessons</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="w-full md:w-80 lg:w-96">
            <div className="sticky p-6 bg-white rounded-lg shadow-md top-24">
              <div className="mb-6">
                <Button className="w-full py-6 text-lg bg-lms-accent hover:bg-lms-primary">
                  Enroll Now
                </Button>
              </div>
              
              <div className="mb-6 p-4 bg-lms-light rounded-lg">
                <div className="flex items-center mb-4 gap-2">
                  <Award className="w-5 h-5 text-lms-primary" />
                  <h3 className="text-lg font-semibold">Skills You'll Gain</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="mb-3 text-lg font-semibold">About the Instructor</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-lms-light flex items-center justify-center text-lms-primary font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{course.instructor}</p>
                    <p className="text-sm text-gray-600">{course.instructorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-lms-primary font-bold">LearnHub © 2025</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-lms-primary">Terms</a>
              <a href="#" className="text-gray-600 hover:text-lms-primary">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-lms-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
