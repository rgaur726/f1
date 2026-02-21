import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  DriverDetailResponseSchema,
  DriversResponseSchema,
  RaceDetailResponseSchema,
  RacesResponseSchema,
  SeasonsResponseSchema,
} from '@f1/types';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getSeasons() {
    const seasons = await this.prisma.season.findMany({ orderBy: { year: 'desc' } });
    return SeasonsResponseSchema.parse({ seasons });
  }

  async getRacesByYear(year: number) {
    const season = await this.prisma.season.findUnique({ where: { year } });
    if (!season) throw new NotFoundException('Season not found');
    const races = await this.prisma.race.findMany({ where: { seasonId: season.id }, orderBy: { round: 'asc' } });
    return RacesResponseSchema.parse({ races: races.map((r) => ({ ...r, startDate: r.startDate.toISOString(), endDate: r.endDate.toISOString() })) });
  }

  async getRaceBySlug(slug: string) {
    const race = await this.prisma.race.findUnique({ where: { slug } });
    if (!race) throw new NotFoundException('Race not found');
    return RaceDetailResponseSchema.parse({ race: { ...race, startDate: race.startDate.toISOString(), endDate: race.endDate.toISOString() } });
  }

  async getDrivers() {
    const drivers = await this.prisma.driver.findMany({ include: { team: true }, orderBy: { number: 'asc' } });
    return DriversResponseSchema.parse({ drivers });
  }

  async getDriverBySlug(slug: string) {
    const driver = await this.prisma.driver.findUnique({ where: { slug }, include: { team: true } });
    if (!driver) throw new NotFoundException('Driver not found');
    return DriverDetailResponseSchema.parse({ driver });
  }
}
