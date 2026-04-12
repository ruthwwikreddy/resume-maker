
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
      <nav
        className={`w-full max-w-4xl glass-strong rounded-2xl transition-all duration-500 ${
          scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : ""
        }`}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-foreground text-base font-semibold tracking-tight">
            Resume<span className="font-light opacity-70">Gen</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            <Link to="/" className="link-reveal text-[13px] text-foreground/50 hover:text-foreground transition-colors duration-300">
              Home
            </Link>
            <Link to="/builder" className="link-reveal text-[13px] text-foreground/50 hover:text-foreground transition-colors duration-300">
              Builder
            </Link>
            <Link to="/templates" className="link-reveal text-[13px] text-foreground/50 hover:text-foreground transition-colors duration-300">
              Templates
            </Link>
            <Link
              to="/builder"
              className="text-[13px] bg-foreground text-background px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground p-1.5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-foreground/5 px-6 py-5 flex flex-col gap-3 animate-fade-in">
            <Link to="/" className="text-foreground/50 hover:text-foreground transition-colors py-2 text-sm" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/builder" className="text-foreground/50 hover:text-foreground transition-colors py-2 text-sm" onClick={() => setIsMenuOpen(false)}>Builder</Link>
            <Link to="/templates" className="text-foreground/50 hover:text-foreground transition-colors py-2 text-sm" onClick={() => setIsMenuOpen(false)}>Templates</Link>
            <Link to="/builder" className="bg-foreground text-background text-center py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-all mt-1" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
