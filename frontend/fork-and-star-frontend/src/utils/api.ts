export async function fetchRestaurants() {
  const res = await fetch("http://127.0.0.1:8000/restaurants/");
  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }
  return res.json();
}