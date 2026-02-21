import { z } from 'zod';

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  primaryColor: z.string(),
  logoUrl: z.string().url(),
});

export const DriverSchema = z.object({
  id: z.string(),
  name: z.string(),
  number: z.number().int(),
  countryCode: z.string().min(2).max(3),
  headshotUrl: z.string().url(),
  shortBio: z.string(),
  slug: z.string(),
  team: TeamSchema,
});

export const RaceSchema = z.object({
  id: z.string(),
  seasonId: z.string(),
  round: z.number().int(),
  name: z.string(),
  country: z.string(),
  countryCode: z.string().min(2).max(3),
  circuitName: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  timezone: z.string(),
  slug: z.string(),
});

export const SeasonSchema = z.object({
  id: z.string(),
  year: z.number().int(),
  status: z.string(),
});

export const SeasonsResponseSchema = z.object({
  seasons: z.array(SeasonSchema),
});

export const RacesResponseSchema = z.object({
  races: z.array(RaceSchema),
});

export const RaceDetailResponseSchema = z.object({
  race: RaceSchema,
});

export const DriversResponseSchema = z.object({
  drivers: z.array(DriverSchema),
});

export const DriverDetailResponseSchema = z.object({
  driver: DriverSchema,
});

export type Team = z.infer<typeof TeamSchema>;
export type Driver = z.infer<typeof DriverSchema>;
export type Race = z.infer<typeof RaceSchema>;
export type Season = z.infer<typeof SeasonSchema>;
export type SeasonsResponse = z.infer<typeof SeasonsResponseSchema>;
export type RacesResponse = z.infer<typeof RacesResponseSchema>;
export type RaceDetailResponse = z.infer<typeof RaceDetailResponseSchema>;
export type DriversResponse = z.infer<typeof DriversResponseSchema>;
export type DriverDetailResponse = z.infer<typeof DriverDetailResponseSchema>;
