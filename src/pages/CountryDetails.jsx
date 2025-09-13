import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCountryByName } from "../utils/helpers";
import { useAppContext } from "../contexts/useAppContext";
import Loader from "../components/Loader";

const CountryDetails = () => {
  const { countryName } = useParams();
  const { savedCountries, setSavedCountries, loading, setLoading } = useAppContext();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setError(null);
      setLoading(true);
      try {
        const data = await fetchCountryByName(decodeURIComponent(countryName));
        setCountry(data[0]);
      } catch (e) {
        setError(e.message || "Failed to load country");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [countryName, setLoading]);

  const save = () => {
    if (!country) return;
    // avoid duplicates by cca3
    if (!savedCountries.find((s) => s.cca3 === country.cca3)) {
      setSavedCountries([...savedCountries, country]);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div style={{ padding: 20, color: "var(--danger)" }}>{error}</div>;
  if (!country) return null;

  const currencyList = country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A";

  return (
    <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <img src={country.flags?.svg || country.flags?.png} alt="flag" style={{ width: 320, borderRadius: 10 }} />
        <div>
          <h2 style={{ marginTop: 0 }}>{country.name.common}</h2>
          <p><strong>Currency:</strong> {currencyList}</p>
          <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
          <p>
            <a href={country.maps?.googleMaps} target="_blank" rel="noreferrer" className="link">Open in Google Maps</a>
          </p>
          <div style={{ marginTop: 12 }}>
            <button onClick={save} className="btn primary" disabled={!!savedCountries.find(s => s.cca3 === country.cca3)}>
              {savedCountries.find(s => s.cca3 === country.cca3) ? "Saved" : "Save to collection"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
