
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">Resume<span className="text-resume-blue">Gen</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-300 hover:text-resume-blue transition-colors">
            Home
          </Link>
          <Link to="/builder" className="text-gray-300 hover:text-resume-blue transition-colors">
            Builder
          </Link>
          <Link to="/templates" className="text-gray-300 hover:text-resume-blue transition-colors">
            Templates
          </Link>
          <Button variant="ghost" className="text-gray-300 hover:text-resume-blue hover:bg-background">
            Sign In
          </Button>
          <Button className="bg-resume-blue hover:bg-resume-blue/90 text-white">
            Sign Up
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8"></line>
                  <line x1="4" y1="16" x2="20" y2="16"></line>
                </>
              )}
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border py-4">
          <div className="container mx-auto px-6 flex flex-col space-y-4">
            <Link to="/" 
              className="text-gray-300 hover:text-resume-blue transition-colors py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link to="/builder" 
              className="text-gray-300 hover:text-resume-blue transition-colors py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Builder
            </Link>
            <Link to="/templates" 
              className="text-gray-300 hover:text-resume-blue transition-colors py-2 px-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Button variant="ghost" className="justify-start text-gray-300 hover:text-resume-blue hover:bg-background">
                Sign In
              </Button>
              <Button className="bg-resume-blue hover:bg-resume-blue/90 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
