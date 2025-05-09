import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero 
        title="Browse Our Courses"
        subtitle="Explore our comprehensive catalog of courses designed to help you learn new skills"
        backgroundImage="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
      />
      
      <div className="container px-4 mx-auto py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">All Courses</h2>
          <p className="text-gray-600">Find the perfect course to expand your skills</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
      {/* Footer */}
        <footer className="py-8 bg-white border-t">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-lms-primary font-bold">LearnHub © 2025</p>
              <div className="flex space-x-6">
                <a href="/about" className="text-gray-600 hover:text-lms-primary">About</a>
                <a href="/courses" className="text-gray-600 hover:text-lms-primary">Courses</a>
                <a href="/contact" className="text-gray-600 hover:text-lms-primary">Contact</a>
              </div>
            </div>
          </div>
        </footer>
    </div>
    
  );
}