import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#dc2626" : "#ffffff",
    textDecoration: "none",
    fontWeight: isActive ? 700 : 500,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    display: "block",
    padding: "12px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    background: isActive 
      ? "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(239, 68, 68, 0.1))" 
      : "transparent",
    borderLeft: isActive ? "3px solid #dc2626" : "3px solid transparent",
    position: "relative",
    overflow: "hidden",
  });

  return (
    <div className="mobile-menu-overlay" style={overlayStyle} onClick={onClose}>
      <div style={menuStyle} onClick={(e) => e.stopPropagation()}>
        <div style={menuHeaderStyle}>
          <span style={menuTitleStyle}>Menu</span>
          <button style={closeButtonStyle} onClick={onClose}>
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
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav style={navStyle}>
          <NavLink to="/" style={linkStyle} onClick={onClose}>
            Home
          </NavLink>
          <NavLink to="/countries" style={linkStyle} onClick={onClose}>
            Countries
          </NavLink>
          <NavLink to="/collection" style={linkStyle} onClick={onClose}>
            Collection
          </NavLink>
          <NavLink to="/quiz" style={linkStyle} onClick={onClose}>
            Quiz
          </NavLink>
          <NavLink to="/leaderboard" style={linkStyle} onClick={onClose}>
            Leaderboard
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "flex-end",
};

const menuStyle = {
  background: "linear-gradient(135deg, var(--secondary) 0%, rgba(26, 26, 26, 0.95) 100%)",
  width: "280px",
  height: "100%",
  boxShadow: "-2px 0 20px rgba(0, 0, 0, 0.4), 0 0 20px rgba(220, 38, 38, 0.1)",
  display: "flex",
  flexDirection: "column",
  backdropFilter: "blur(10px)",
};

const menuHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const menuTitleStyle = {
  fontSize: "18px",
  fontWeight: "900",
  color: "#ffffff",
  textTransform: "uppercase",
  letterSpacing: "2px",
  background: "linear-gradient(135deg, #ffffff, #dc2626)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const closeButtonStyle = {
  background: "linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(239, 68, 68, 0.05))",
  border: "1px solid rgba(220, 38, 38, 0.3)",
  cursor: "pointer",
  color: "#ffffff",
  padding: "8px",
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.3s ease",
  boxShadow: "0 0 10px rgba(220, 38, 38, 0.2)",
};

const navStyle = {
  flex: 1,
  padding: "10px 0",
};

export default MobileMenu;
