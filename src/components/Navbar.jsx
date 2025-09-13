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
    color: isActive ? "#87CEEB" : "white", // Light blue when active, white when inactive
    textDecoration: "none",
    fontWeight: isActive ? 600 : 400,
    transition: "color 0.2s ease",
  });
 
  return (
    <>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link className="text-white font-bold text-2xl decoration-none" to="/">Country Explorer</Link>
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
