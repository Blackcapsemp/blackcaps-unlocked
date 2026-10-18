export type CityLocation = { name: string; lat: number; lng: number };
export type CityGroup = { key: string; name: string; count: number; location: CityLocation | null };
export type CityArtist = { city: string; style: string };
export type CityRow = [string, number, number, number, string[]];

export function normalizeCity(value: string) {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
}

export function createCityResolver(rows: CityRow[]) {
  const index = new Map<string, CityRow[]>();
  for (const row of rows) {
    for (const name of new Set([row[0], ...row[4]].map(normalizeCity))) {
      if (!name) continue;
      const matches = index.get(name) ?? [];
      matches.push(row);
      index.set(name, matches);
    }
  }
  return (city: string): CityLocation | null => {
    const matches = [...(index.get(normalizeCity(city)) ?? [])].sort((a, b) => b[3] - a[3]);
    const first = matches[0];
    if (!first) return null;
    // Ambiguous homonyms are not guessed unless one is clearly the principal city.
    if (matches.some((m) => Math.abs(m[1] - first[1]) + Math.abs(m[2] - first[2]) > 0.1 && first[3] < Math.max(1, m[3]) * 10)) return null;
    return { name: first[0], lat: first[1], lng: first[2] };
  };
}

export function cityKey(city: string, resolve?: (city: string) => CityLocation | null) {
  return normalizeCity(resolve?.(city)?.name ?? city);
}

export function groupCities(artists: CityArtist[], resolve?: (city: string) => CityLocation | null): CityGroup[] {
  const groups = new Map<string, CityGroup>();
  for (const artist of artists) {
    if (!artist.city.trim()) continue;
    const location = resolve?.(artist.city) ?? null;
    const key = cityKey(artist.city, resolve);
    const group = groups.get(key);
    if (group) group.count += 1;
    else groups.set(key, { key, name: location?.name ?? artist.city.trim(), count: 1, location });
  }
  return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function filterRoster<T extends CityArtist>(artists: T[], style: string, city: string, resolve?: (city: string) => CityLocation | null): T[] {
  return artists.filter((a) => (style === "Todos" || a.style === style) && (!city || cityKey(a.city, resolve) === city));
}