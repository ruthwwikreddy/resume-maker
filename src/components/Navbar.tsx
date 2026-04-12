
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-foreground text-lg font-bold tracking-tight">
          Resume<span className="font-light">Gen</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="link-reveal text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
            Home
          </Link>
          <Link to="/builder" className="link-reveal text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
            Builder
          </Link>
          <Link to="/templates" className="link-reveal text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
            Templates
          </Link>
          <Link to="/builder" className="text-sm border border-foreground/30 text-foreground px-5 py-2 hover:bg-foreground hover:text-background transition-all duration-300">
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="8" x2="20" y2="8" />
                <line x1="4" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/50 animate-fade-in">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/builder" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Builder
            </Link>
            <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Templates
            </Link>
            <Link to="/builder" className="border border-foreground/30 text-foreground text-center py-3 hover:bg-foreground hover:text-background transition-all duration-300" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
