import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";

// Mock data for courses
const coursesData = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the core concepts of web development including HTML, CSS and JavaScript to build modern websites.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Programming",
    instructor: "Alex Morgan",
    lessons: 24,
    duration: "8 weeks"
  },
  {
    id: "2",
    title: "UI/UX Design Principles",
    description: "Master the fundamentals of user interface and experience design to create beautiful, functional applications.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Design",
    instructor: "Sarah Johnson",
    lessons: 18,
    duration: "6 weeks"
  },
  {
    id: "3",
    title: "Data Science Essentials",
    description: "An introduction to data science using Python, pandas, and visualization tools to extract insights from data.",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Data Science",
    instructor: "Michael Chen",
    lessons: 32,
    duration: "10 weeks"
  },
  {
    id: "4",
    title: "Digital Marketing Mastery",
    description: "Learn proven digital marketing strategies to grow your business and reach more customers online.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Marketing",
    instructor: "Emily Rodriguez",
    lessons: 20,
    duration: "7 weeks"
  },
  {
    id: "5",
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native that work on both iOS and Android.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Programming",
    instructor: "David Kim",
    lessons: 28,
    duration: "9 weeks"
  },
  {
    id: "6",
    title: "Business Analytics and Intelligence",
    description: "Learn how to use data analytics to make better business decisions and gain competitive advantage.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Business",
    instructor: "Christine Taylor",
    lessons: 22,
    duration: "8 weeks"
  }
];

export default function Index() {
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  const handleSearch = (searchTerm: string, category: string) => {
    // Filter courses based on search term and category
    const filtered = coursesData.filter(course => {
      const matchesSearchTerm = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "" || course.category === category;
      
      return matchesSearchTerm && matchesCategory;
    });
    
    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero 
        title="Learn Anything, Anytime"
        subtitle="Discover thousands of courses to help you grow personally and professionally."
        backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      />
      
      <div className="container px-4 mx-auto -mt-8">
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <p className="text-gray-600">Expand your knowledge with our most popular courses</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))
          ) : (
            <div className="col-span-full py-8 text-center">
              <p className="text-lg text-gray-600">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-lms-light">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
          <p className="max-w-lg mx-auto mb-6 text-lg">Subscribe to our newsletter and get updates on new courses and learning resources.</p>
          <div className="flex flex-col items-center max-w-lg mx-auto space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg md:flex-1"
            />
            <Button className="w-full bg-lms-primary hover:bg-lms-secondary md:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
      
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
