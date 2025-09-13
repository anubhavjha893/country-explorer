import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#87CEEB" : "white",
    textDecoration: "none",
    fontWeight: isActive ? 600 : 400,
    transition: "color 0.2s ease",
    display: "block",
    padding: "12px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
  backgroundColor: "var(--secondary)",
  width: "280px",
  height: "100%",
  boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
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
  fontWeight: "600",
  color: "white",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "white",
  padding: "4px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
};

const navStyle = {
  flex: 1,
  padding: "10px 0",
};

export default MobileMenu;
