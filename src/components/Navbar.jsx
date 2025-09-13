import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={navStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link to="/" style={logoStyle}>Country Explorer</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={desktopNavStyle}>
          <NavLink to="/" style={linkStyle}>Home</NavLink>
          <NavLink to="/countries" style={linkStyle}>Countries</NavLink>
          <NavLink to="/collection" style={linkStyle}>Collection</NavLink>
          <NavLink to="/quiz" style={linkStyle}>Quiz</NavLink>
          <NavLink to="/leaderboard" style={linkStyle}>Leaderboard</NavLink>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button"
          style={mobileMenuButtonStyle}
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

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  background: "var(--secondary)",
  color: "var(--text-on-secondary)",
};

const logoStyle = {
  fontWeight: 700,
  fontSize: 18,
  color: "white",
  textDecoration: "none",
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#87CEEB" : "white", // Light blue when active, white when inactive
  textDecoration: "none",
  fontWeight: isActive ? 600 : 400,
  transition: "color 0.2s ease",
});

const desktopNavStyle = {
  display: "flex",
  gap: 14,
  alignItems: "center",
};

const mobileMenuButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "white",
  padding: "8px",
  borderRadius: "4px",
  transition: "background-color 0.2s ease",
};

export default Navbar;
