import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  const flag = country.flags?.svg || country.flags?.png || "";
  const name = country.name?.common || country.name;
  return (
    <Link
      to={`/countries/${encodeURIComponent(name)}`}
      className="country-card"
      style={{
        background: "var(--card-bg)",
        padding: 12,
        borderRadius: 12,
        textAlign: "center",
        display: "block",
        textDecoration: "none",
        color: "inherit",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <img
        src={flag}
        alt={name}
        style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }}
      />
      <div style={{ marginTop: 10, fontWeight: 600 }}>{name}</div>
    </Link>
  );
};

export default CountryCard;
