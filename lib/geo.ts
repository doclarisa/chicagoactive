// Radius-fill math for city pages. Distances are computed from a city's
// centroid (the average of its own listings' coordinates) to nearby
// listings — see geoPrecision handling below for why decimal-mile figures
// are only shown for listings geocoded from a real street address.
export type GeoPoint = { lat: number; lng: number };

const EARTH_RADIUS_MI = 3958.8;

export function haversineMiles(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(h));
}

export function centroid(points: GeoPoint[]): GeoPoint | null {
  if (points.length === 0) return null;
  const lat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
  const lng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
  return { lat, lng };
}

// "exact" listings were geocoded from a real street address, so a decimal
// distance is honest. "approximate" listings (city/jurisdiction centroid
// geocodes) never earn a decimal figure — that would manufacture precision
// the underlying geocode doesn't have.
export function formatDistance(miles: number, geoPrecision: string | null): string {
  if (geoPrecision === "exact") return `${miles.toFixed(1)} mi`;
  return `~${Math.round(miles) || 1} mi`;
}
