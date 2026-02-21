import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const teams = [
  { name: 'Red Bull Racing', primaryColor: '#1E41FF', logoUrl: 'https://placehold.co/120x60?text=RBR' },
  { name: 'Mercedes', primaryColor: '#00D2BE', logoUrl: 'https://placehold.co/120x60?text=Mercedes' },
  { name: 'Ferrari', primaryColor: '#DC0000', logoUrl: 'https://placehold.co/120x60?text=Ferrari' },
  { name: 'McLaren', primaryColor: '#FF8700', logoUrl: 'https://placehold.co/120x60?text=McLaren' },
  { name: 'Aston Martin', primaryColor: '#006F62', logoUrl: 'https://placehold.co/120x60?text=Aston' },
  { name: 'Alpine', primaryColor: '#0090FF', logoUrl: 'https://placehold.co/120x60?text=Alpine' },
  { name: 'Williams', primaryColor: '#005AFF', logoUrl: 'https://placehold.co/120x60?text=Williams' },
  { name: 'RB', primaryColor: '#6692FF', logoUrl: 'https://placehold.co/120x60?text=RB' },
  { name: 'Kick Sauber', primaryColor: '#00E701', logoUrl: 'https://placehold.co/120x60?text=Sauber' },
  { name: 'Haas', primaryColor: '#B6BABD', logoUrl: 'https://placehold.co/120x60?text=Haas' },
] as const;

const drivers = [
  ['Max Verstappen', 1, 'NL', 'max-verstappen', 'Four-time world champion known for relentless pace.', 'Red Bull Racing'],
  ['Yuki Tsunoda', 22, 'JP', 'yuki-tsunoda', 'Aggressive racer with growing racecraft and consistency.', 'Red Bull Racing'],
  ['George Russell', 63, 'GB', 'george-russell', 'Precision-focused leader in Mercedes\' next era.', 'Mercedes'],
  ['Kimi Antonelli', 12, 'IT', 'kimi-antonelli', 'Highly rated rookie with standout junior record.', 'Mercedes'],
  ['Charles Leclerc', 16, 'MC', 'charles-leclerc', 'Qualifying specialist with race-winning speed.', 'Ferrari'],
  ['Lewis Hamilton', 44, 'GB', 'lewis-hamilton', 'Seven-time champion chasing more history in red.', 'Ferrari'],
  ['Lando Norris', 4, 'GB', 'lando-norris', 'Title contender with elite one-lap and race pace.', 'McLaren'],
  ['Oscar Piastri', 81, 'AU', 'oscar-piastri', 'Calm and clinical racer with rapid progression.', 'McLaren'],
  ['Fernando Alonso', 14, 'ES', 'fernando-alonso', 'Veteran tactician extracting maximum from every weekend.', 'Aston Martin'],
  ['Lance Stroll', 18, 'CA', 'lance-stroll', 'Experienced midfield scorer with wet-weather strength.', 'Aston Martin'],
  ['Pierre Gasly', 10, 'FR', 'pierre-gasly', 'Fast and adaptable racer with podium pedigree.', 'Alpine'],
  ['Jack Doohan', 7, 'AU', 'jack-doohan', 'Young talent stepping into full-time F1 competition.', 'Alpine'],
  ['Alex Albon', 23, 'TH', 'alex-albon', 'Dynamic overtaker and team leader at Williams.', 'Williams'],
  ['Franco Colapinto', 43, 'AR', 'franco-colapinto', 'Exciting newcomer with raw speed and confidence.', 'Williams'],
  ['Liam Lawson', 30, 'NZ', 'liam-lawson', 'Sharp racer with decisive wheel-to-wheel instincts.', 'RB'],
  ['Isack Hadjar', 6, 'FR', 'isack-hadjar', 'Promising young driver with aggressive qualifying style.', 'RB'],
  ['Valtteri Bottas', 77, 'FI', 'valtteri-bottas', 'Reliable veteran delivering setup feedback and consistency.', 'Kick Sauber'],
  ['Nico Hulkenberg', 27, 'DE', 'nico-hulkenberg', 'Experienced qualifier maximizing midfield opportunities.', 'Kick Sauber'],
  ['Esteban Ocon', 31, 'FR', 'esteban-ocon', 'Resilient racer with race-winning experience.', 'Haas'],
  ['Oliver Bearman', 87, 'GB', 'oliver-bearman', 'Highly touted young talent with immediate F1 impact.', 'Haas'],
] as const;

const races = [
  [1, 'Bahrain Grand Prix', 'Bahrain', 'BH', 'Bahrain International Circuit', '2026-03-08T15:00:00Z', '2026-03-08T17:00:00Z', 'Asia/Bahrain', 'bahrain-grand-prix'],
  [2, 'Saudi Arabian Grand Prix', 'Saudi Arabia', 'SA', 'Jeddah Corniche Circuit', '2026-03-15T17:00:00Z', '2026-03-15T19:00:00Z', 'Asia/Riyadh', 'saudi-arabian-grand-prix'],
  [3, 'Australian Grand Prix', 'Australia', 'AU', 'Albert Park Circuit', '2026-03-29T04:00:00Z', '2026-03-29T06:00:00Z', 'Australia/Melbourne', 'australian-grand-prix'],
  [4, 'Japanese Grand Prix', 'Japan', 'JP', 'Suzuka Circuit', '2026-04-12T05:00:00Z', '2026-04-12T07:00:00Z', 'Asia/Tokyo', 'japanese-grand-prix'],
  [5, 'Chinese Grand Prix', 'China', 'CN', 'Shanghai International Circuit', '2026-04-19T07:00:00Z', '2026-04-19T09:00:00Z', 'Asia/Shanghai', 'chinese-grand-prix'],
  [6, 'Miami Grand Prix', 'United States', 'US', 'Miami International Autodrome', '2026-05-03T20:00:00Z', '2026-05-03T22:00:00Z', 'America/New_York', 'miami-grand-prix'],
  [7, 'Emilia Romagna Grand Prix', 'Italy', 'IT', 'Imola Circuit', '2026-05-17T13:00:00Z', '2026-05-17T15:00:00Z', 'Europe/Rome', 'emilia-romagna-grand-prix'],
  [8, 'Monaco Grand Prix', 'Monaco', 'MC', 'Circuit de Monaco', '2026-05-24T13:00:00Z', '2026-05-24T15:00:00Z', 'Europe/Monaco', 'monaco-grand-prix'],
  [9, 'Spanish Grand Prix', 'Spain', 'ES', 'Circuit de Barcelona-Catalunya', '2026-06-07T13:00:00Z', '2026-06-07T15:00:00Z', 'Europe/Madrid', 'spanish-grand-prix'],
  [10, 'Canadian Grand Prix', 'Canada', 'CA', 'Circuit Gilles Villeneuve', '2026-06-14T18:00:00Z', '2026-06-14T20:00:00Z', 'America/Toronto', 'canadian-grand-prix'],
  [11, 'Austrian Grand Prix', 'Austria', 'AT', 'Red Bull Ring', '2026-06-28T13:00:00Z', '2026-06-28T15:00:00Z', 'Europe/Vienna', 'austrian-grand-prix'],
  [12, 'British Grand Prix', 'United Kingdom', 'GB', 'Silverstone Circuit', '2026-07-05T14:00:00Z', '2026-07-05T16:00:00Z', 'Europe/London', 'british-grand-prix'],
  [13, 'Belgian Grand Prix', 'Belgium', 'BE', 'Spa-Francorchamps', '2026-07-19T13:00:00Z', '2026-07-19T15:00:00Z', 'Europe/Brussels', 'belgian-grand-prix'],
  [14, 'Hungarian Grand Prix', 'Hungary', 'HU', 'Hungaroring', '2026-07-26T13:00:00Z', '2026-07-26T15:00:00Z', 'Europe/Budapest', 'hungarian-grand-prix'],
  [15, 'Dutch Grand Prix', 'Netherlands', 'NL', 'Circuit Zandvoort', '2026-08-30T13:00:00Z', '2026-08-30T15:00:00Z', 'Europe/Amsterdam', 'dutch-grand-prix'],
  [16, 'Italian Grand Prix', 'Italy', 'IT', 'Monza Circuit', '2026-09-06T13:00:00Z', '2026-09-06T15:00:00Z', 'Europe/Rome', 'italian-grand-prix'],
  [17, 'Azerbaijan Grand Prix', 'Azerbaijan', 'AZ', 'Baku City Circuit', '2026-09-20T11:00:00Z', '2026-09-20T13:00:00Z', 'Asia/Baku', 'azerbaijan-grand-prix'],
  [18, 'Singapore Grand Prix', 'Singapore', 'SG', 'Marina Bay Street Circuit', '2026-10-04T12:00:00Z', '2026-10-04T14:00:00Z', 'Asia/Singapore', 'singapore-grand-prix'],
  [19, 'United States Grand Prix', 'United States', 'US', 'Circuit of The Americas', '2026-10-18T19:00:00Z', '2026-10-18T21:00:00Z', 'America/Chicago', 'united-states-grand-prix'],
  [20, 'Mexico City Grand Prix', 'Mexico', 'MX', 'Autodromo Hermanos Rodriguez', '2026-10-25T20:00:00Z', '2026-10-25T22:00:00Z', 'America/Mexico_City', 'mexico-city-grand-prix'],
  [21, 'Sao Paulo Grand Prix', 'Brazil', 'BR', 'Interlagos', '2026-11-08T17:00:00Z', '2026-11-08T19:00:00Z', 'America/Sao_Paulo', 'sao-paulo-grand-prix'],
  [22, 'Las Vegas Grand Prix', 'United States', 'US', 'Las Vegas Strip Circuit', '2026-11-22T06:00:00Z', '2026-11-22T08:00:00Z', 'America/Los_Angeles', 'las-vegas-grand-prix'],
  [23, 'Qatar Grand Prix', 'Qatar', 'QA', 'Lusail International Circuit', '2026-11-29T16:00:00Z', '2026-11-29T18:00:00Z', 'Asia/Qatar', 'qatar-grand-prix'],
  [24, 'Abu Dhabi Grand Prix', 'United Arab Emirates', 'AE', 'Yas Marina Circuit', '2026-12-06T13:00:00Z', '2026-12-06T15:00:00Z', 'Asia/Dubai', 'abu-dhabi-grand-prix'],
] as const;

async function main() {
  await prisma.driver.deleteMany();
  await prisma.race.deleteMany();
  await prisma.team.deleteMany();
  await prisma.season.deleteMany();

  const season = await prisma.season.create({ data: { year: 2026, status: 'scheduled' } });

  for (const team of teams) {
    await prisma.team.create({ data: team });
  }

  const teamMap = new Map((await prisma.team.findMany()).map((t) => [t.name, t.id]));

  for (const [name, number, countryCode, slug, shortBio, teamName] of drivers) {
    await prisma.driver.create({
      data: {
        name,
        number,
        countryCode,
        slug,
        shortBio,
        teamId: teamMap.get(teamName)!,
        headshotUrl: `https://placehold.co/400x400?text=${encodeURIComponent(name)}`,
      },
    });
  }

  for (const [round, name, country, countryCode, circuitName, startDate, endDate, timezone, slug] of races) {
    await prisma.race.create({
      data: { seasonId: season.id, round, name, country, countryCode, circuitName, startDate: new Date(startDate), endDate: new Date(endDate), timezone, slug },
    });
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
