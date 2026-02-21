import { DriverDetailResponseSchema, DriversResponseSchema, RaceDetailResponseSchema, RacesResponseSchema } from '@f1/types';
import { apiBaseUrl } from './config';

async function fetchJson<T>(path: string, schema: { parse: (d: unknown) => T }): Promise<T> {
  const res = await fetch(`${apiBaseUrl}${path}`);
  if (!res.ok) throw new Error('Failed request');
  const json = await res.json();
  return schema.parse(json);
}

export const api = {
  races: () => fetchJson('/api/v1/seasons/2026/races', RacesResponseSchema),
  race: (slug: string) => fetchJson(`/api/v1/races/${slug}`, RaceDetailResponseSchema),
  drivers: () => fetchJson('/api/v1/drivers', DriversResponseSchema),
  driver: (slug: string) => fetchJson(`/api/v1/drivers/${slug}`, DriverDetailResponseSchema),
};
