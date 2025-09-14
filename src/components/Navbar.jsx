import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 20px",
    background: "var(--secondary)",
    color: "var(--text-on-secondary)",
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "var(--accent)" : "var(--text-on-secondary)",
    textDecoration: "none",
    fontWeight: isActive ? 700 : 500,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "0.9rem",
    padding: "8px 16px",
    borderRadius: "6px",
    background: isActive 
      ? "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.1))" 
      : "transparent",
    border: isActive 
      ? "1px solid rgba(220, 38, 38, 0.5)" 
      : "1px solid transparent",
    boxShadow: isActive 
      ? "0 0 15px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)" 
      : "none",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  });
 
  return (
    <>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link 
            to="/" 
            style={{
              textDecoration: "none"
            }}
          >
            <span className="mobile-logo" style={{
              color: "var(--text-on-secondary)",
              fontSize: "1.2rem",
              fontWeight: "900",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              background: "linear-gradient(135deg, var(--text-on-secondary), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 10px rgba(220, 38, 38, 0.3)"
            }}>
              Country Explorer
            </span>
          </Link>
        </div>


        {/* Desktop Navigation */}
        <div className="desktop-nav hidden lg:flex gap-10 items-center">
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/countries" style={linkStyle}>Countries</NavLink>
          <NavLink to="/collection" style={linkStyle}>Collection</NavLink>
          <NavLink to="/quiz" style={linkStyle}>Quiz</NavLink>
          <NavLink to="/leaderboard" style={linkStyle}>Leaderboard</NavLink>
        </div>
        <ThemeToggle />
        {/* Mobile Menu Button */}

        <button
          className="mobile-menu-button lg:hidden border-none cursor-pointer p-2 rounded-md transition-background-color ease"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
};











export default Navbar;
