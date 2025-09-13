import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/useAppContext";
import CountryCard from "../components/CountryCard";
import Loader from "../components/Loader";

function Countries() {
  const [region, setRegion] = useState("Europe");
  const [countries, setCountries] = useState([]);
  const { loading, setLoading } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/region/${region}`
        );
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [region]);

  return (
    <div>
      <h1 className="page-title">Countries in {region}</h1>
      <select value={region} onChange={(e) => setRegion(e.target.value)}>
        <option>Europe</option>
        <option>Asia</option>
        <option>Africa</option>
        <option>Americas</option>
        <option>Oceania</option>
      </select>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid">
          {countries.map((c) => (
            <CountryCard key={c.cca3} country={c} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Countries;
