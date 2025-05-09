import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Hero 
        title="About LearnHub"
        subtitle="Our mission is to provide quality education accessible to everyone"
        backgroundImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
      />
      
      <div className="container px-4 mx-auto py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6">
            LearnHub was founded with a simple but powerful idea: education should be accessible to everyone, 
            regardless of their background or circumstances. We believe in the transformative power of 
            learning and its ability to change lives.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Our platform brings together expert instructors and eager students from around the world, 
            creating a global community dedicated to knowledge sharing and skill development.
          </p>
          
          <div className="my-12">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2">Accessibility</h4>
                <p>Making quality education available to everyone, everywhere</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2">Excellence</h4>
                <p>Maintaining the highest standards in our course offerings</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-xl mb-2">Community</h4>
                <p>Fostering connections between learners and instructors worldwide</p>
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