import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/useAppContext";

const Collection = () => {
  const { savedCountries, setSavedCountries } = useAppContext();
  const navigate = useNavigate();

  const remove = (cca3) => {
    setSavedCountries(savedCountries.filter(c => c.cca3 !== cca3));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Saved Countries</h2>
      {savedCountries.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>You have not saved any countries yet.</p>
      ) : (
        <div className="grid cards">
          {savedCountries.map(c => (
            <div key={c.cca3} className="country-card-collection">
              <img src={c.flags?.svg || c.flags?.png} alt={c.name.common} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
              <div style={{ padding: 10 }}>
                <div style={{ fontWeight: 600 }}>{c.name?.common || c.name}</div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <button onClick={() => navigate(`/countries/${encodeURIComponent(c.name.common)}`)} className="btn">Details</button>
                  <button onClick={() => remove(c.cca3)} className="btn danger">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;
