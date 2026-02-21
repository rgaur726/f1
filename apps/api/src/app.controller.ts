import { Controller, Get, Header, Param, ParseIntPipe, Query, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { z } from 'zod';
import { AppService } from './app.service';
import { ZodValidationPipe } from './zod-validation.pipe';

const slugSchema = z.object({ slug: z.string().min(1) });

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealth() {
    return { ok: true, service: 'f1-api' };
  }

  @Get('/seasons')
  @Header('Cache-Control', 'public, max-age=60')
  getSeasons() {
    return this.appService.getSeasons();
  }

  @Get('/seasons/:year/races')
  @Header('Cache-Control', 'public, max-age=120')
  getRacesByYear(@Param('year', ParseIntPipe) year: number) {
    return this.appService.getRacesByYear(year);
  }

  @Get('/races/:slug')
  @UsePipes(new ZodValidationPipe(slugSchema))
  getRaceBySlug(@Param() params: { slug: string }) {
    return this.appService.getRaceBySlug(params.slug);
  }

  @Get('/drivers')
  @Header('Cache-Control', 'public, max-age=120')
  getDrivers() {
    return this.appService.getDrivers();
  }

  @Get('/drivers/:slug')
  @UsePipes(new ZodValidationPipe(slugSchema))
  getDriverBySlug(@Param() params: { slug: string }) {
    return this.appService.getDriverBySlug(params.slug);
  }

  @Get('/ics/races/:slug')
  async getRaceIcs(@Param() params: { slug: string }, @Res() res: Response) {
    slugSchema.parse(params);
    const raceDetail = await this.appService.getRaceBySlug(params.slug);
    const { race } = raceDetail;

    const fmt = (d: string) => new Date(d).toISOString().replace(/[-:]/g, '').replace('.000', '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//F1 PWA//EN',
      'BEGIN:VEVENT',
      `UID:${race.slug}@f1-pwa`,
      `SUMMARY:${race.name}`,
      `DTSTART:${fmt(race.startDate)}`,
      `DTEND:${fmt(race.endDate)}`,
      `DESCRIPTION:${race.circuitName} - ${race.country}`,
      'END:VEVENT',
      'END:VCALENDAR',
      '',
    ].join('\r\n');

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${race.slug}.ics"`);
    res.send(ics);
  }
}
