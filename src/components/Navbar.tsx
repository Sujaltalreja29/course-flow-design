
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const activeClass = "text-lms-accent font-semibold";
  const inactiveClass = "text-gray-700 hover:text-lms-primary transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between px-4 py-4 mx-auto">
        <NavLink to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-lms-primary">LearnHub</span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                isActive ? activeClass : inactiveClass
              }
              end
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:block">
          <Button className="bg-lms-accent hover:bg-lms-primary transition-colors">
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleNavbar} className="p-2">
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col w-full h-screen pt-16 pb-6 bg-white md:hidden animate-fade-in">
          <div className="container flex flex-col h-full px-4 mx-auto space-y-6 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-lg py-2 ${isActive ? activeClass : inactiveClass}`
                }
                onClick={() => setIsOpen(false)}
                end
              >
                {item.name}
              </NavLink>
            ))}
            <div className="pt-4 mt-auto border-t">
              <Button className="w-full bg-lms-accent hover:bg-lms-primary">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
