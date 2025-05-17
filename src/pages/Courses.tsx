import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  fetchCourses, 
  selectAllCourses, 
  selectCourseStatus, 
  selectLastFetched,
  Course 
} from "../store/coursesSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import LoadingIndicator from "../components/LoadingIndicator";
import { Button } from "../components/ui/button";

export default function Courses() {
  // Redux
const dispatch = useAppDispatch();
const courses = useAppSelector(selectAllCourses);
const status = useAppSelector(selectCourseStatus);
const lastFetched = useAppSelector(selectLastFetched);

  // Fetch courses if not already fetched or if it's been more than 5 minutes
  useEffect(() => {
    const shouldFetch = () => {
      if (status === 'idle') return true;
      if (!lastFetched) return true;
      
      // Refetch if last fetch was more than 5 minutes ago
      const fiveMinutesAgo = new Date(new Date().getTime() - 5 * 60 * 1000);
      return new Date(lastFetched) < fiveMinutesAgo;
    };

    if (shouldFetch()) {
      dispatch(fetchCourses());
    }
  }, [dispatch, status, lastFetched]);

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
        
        {/* Loading state */}
        {status === 'loading' && <LoadingIndicator />}
        
        {/* Error state */}
        {status === 'failed' && (
          <div className="text-center p-8 bg-red-50 rounded-lg mb-8">
            <p className="text-red-500">Failed to load courses. Please try again later.</p>
            <Button 
              onClick={() => dispatch(fetchCourses())}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white"
            >
              Retry
            </Button>
          </div>
        )}
        
        {/* Courses grid */}
        {status === 'succeeded' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        )}
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