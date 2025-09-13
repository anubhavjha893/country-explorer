// helpers: fetch + shuffle utilities

export const API_REGION = (region) =>
  `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`;

export const API_NAME = (name) =>
  `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`;

export async function fetchCountriesByRegion(region) {
  const res = await fetch(API_REGION(region));
  if (!res.ok) throw new Error("Failed to fetch countries for region: " + region);
  return res.json();
}

export async function fetchCountryByName(name) {
  const res = await fetch(API_NAME(name));
  if (!res.ok) throw new Error("Country not found: " + name);
  return res.json();
}

export function shuffleArray(arr) {
  // Fisher-Yates shuffle
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
