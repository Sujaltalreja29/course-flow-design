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

export default function Index() {
  // Redux
const dispatch = useAppDispatch();
const courses = useAppSelector(selectAllCourses);
const status = useAppSelector(selectCourseStatus);
const lastFetched = useAppSelector(selectLastFetched);

  // Local state
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState([]);

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

  // Extract categories whenever courses changes
  useEffect(() => {
    if (courses.length > 0) {
      const uniqueCategories = [...new Set(courses.map(course => course.category))];
      setCategories(uniqueCategories);
      
      // Apply initial filtering
      setFilteredCourses(courses);
    }
  }, [courses]);

  // Filter courses based on search term and category
  useEffect(() => {
    const filtered = courses.filter(course => {
      const matchesSearchTerm = !searchTerm || 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !activeCategory || course.category === activeCategory;
      
      return matchesSearchTerm && matchesCategory;
    });
    
    setFilteredCourses(filtered);
  }, [searchTerm, activeCategory, courses]);

  // Handle category selection
  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? "" : category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero 
        title="Learn Anything, Anytime"
        subtitle="Discover thousands of courses to help you grow personally and professionally."
        backgroundImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      />
      
      <div className="container px-4 mx-auto pt-8">
        {/* Search bar */}
        <div className="mb-6 relative">
          <div className="flex items-center w-full max-w-3xl mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pr-10 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-lms-primary"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("")}
            className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition-colors flex items-center ${
                activeCategory === category 
                  ? "bg-gray-800 text-white" 
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              <span>{category}</span>
              <span className="ml-2 text-xs opacity-70">
                {courses.filter(course => course.category === category).length}+ learners
              </span>
            </button>
          ))}
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <p className="text-gray-600">Expand your knowledge with our most popular courses</p>
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))
            ) : (
              <div className="col-span-full py-8 text-center">
                <p className="text-lg text-gray-600">No courses found matching your criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("");
                  }}
                  className="mt-4 bg-lms-primary hover:bg-lms-secondary"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Newsletter/Community Section */}
      <section id="contact" className="py-16 bg-lms-light">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
          <p className="max-w-lg mx-auto mb-6 text-lg">Subscribe to our newsletter and get updates on new courses and learning resources.</p>
          <div className="flex flex-col items-center max-w-lg mx-auto space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg md:flex-1 focus:outline-none focus:ring-2 focus:ring-lms-primary"
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
              <Link to="/about" className="text-gray-600 hover:text-lms-primary">About</Link>
              <Link to="/courses" className="text-gray-600 hover:text-lms-primary">Courses</Link>
              <Link to="/contact" className="text-gray-600 hover:text-lms-primary">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}