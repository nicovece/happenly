/**
 * Seed a Google Calendar with mock event data.
 *
 * Uses OAuth2 (your personal Google account) to write events,
 * since the calendar owner needs write access.
 *
 * Prerequisites:
 * 1. The Google Calendar API must be enabled in your GCP project
 * 2. OAuth2 credentials (CLIENT_ID, CLIENT_SECRET) from auth-server/config.json
 *
 * Usage:
 *   cd auth-server && npx tsx seed-calendar.ts
 *
 * The script will print a URL — open it in your browser, sign in,
 * and paste the authorization code back into the terminal.
 *
 * Environment variables (optional):
 *   GOOGLE_CALENDAR_ID - defaults to the calendar ID below
 */

import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { createServer } from 'http';

const config = JSON.parse(readFileSync('./config.json', 'utf-8'));

const REDIRECT_URI = 'http://localhost:3000/';

const CALENDAR_ID =
  process.env.GOOGLE_CALENDAR_ID ||
  'c_c2fee600373f90314f4a7f9b970f8102d3e9cb849036d2649a7814a05dc6f699@group.calendar.google.com';

const oAuth2Client = new google.auth.OAuth2(
  config.CLIENT_ID,
  config.CLIENT_SECRET,
  REDIRECT_URI
);

const mockEvents = [
  {
    summary: 'Learn JavaScript',
    description:
      'Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :)\n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.',
    location: 'London, UK',
    duration: 60,
    timeZone: 'Europe/Berlin',
  },
  {
    summary: 'React is Fun',
    description:
      'Love JS? Want to learn React? This is the place! Join us for a fun session where we will explore React and its ecosystem. Build interactive UIs with the most popular JavaScript library.',
    location: 'Berlin, Germany',
    duration: 60,
    timeZone: 'Europe/Berlin',
  },
  {
    summary: 'Angular Meetup',
    description:
      'Explore the power of Angular! From components to services, dependency injection to routing — join us and level up your Angular skills in a friendly, hands-on workshop.',
    location: 'Munich, Germany',
    duration: 90,
    timeZone: 'Europe/Berlin',
  },
  {
    summary: 'Node.js Workshop',
    description:
      'Dive into server-side JavaScript with Node.js. Learn how to build REST APIs, work with databases, and deploy your applications. Perfect for frontend devs expanding to fullstack.',
    location: 'Amsterdam, Netherlands',
    duration: 120,
    timeZone: 'Europe/Amsterdam',
  },
  {
    summary: 'TypeScript Deep Dive',
    description:
      'Go beyond the basics of TypeScript. We will cover generics, utility types, declaration merging, and advanced patterns that make large codebases maintainable and safe.',
    location: 'London, UK',
    duration: 90,
    timeZone: 'Europe/London',
  },
];

function generateSchedule(count: number): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  const startDay = new Date(now);
  startDay.setDate(startDay.getDate() + 1);

  for (let i = 0; i < count; i++) {
    const date = new Date(startDay);
    date.setDate(date.getDate() + Math.floor((i * 60) / count));
    const hours = [10, 14, 16, 18][i % 4];
    date.setHours(hours, 0, 0, 0);
    dates.push(date);
  }

  return dates;
}

function waitForAuthCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url || '', REDIRECT_URI);
      const code = url.searchParams.get('code');
      const error = url.searchParams.get('error');

      if (error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Authorization failed</h1><p>You can close this tab.</p>');
        server.close();
        reject(new Error(`Auth error: ${error}`));
        return;
      }

      if (code) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Authorization successful!</h1><p>You can close this tab.</p>');
        server.close();
        resolve(code);
      }
    });

    server.listen(3000, () => {
      console.log('Waiting for authorization on http://localhost:3000 ...\n');
    });
  });
}

async function authenticate() {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
  });

  console.log('Open this URL in your browser to authorize:\n');
  console.log(authUrl);
  console.log();

  const code = await waitForAuthCode();
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  console.log('Authenticated successfully.\n');
}

async function main() {
  await authenticate();

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  const totalEvents = 35;
  const dates = generateSchedule(totalEvents);

  console.log(`Seeding ${totalEvents} events into calendar: ${CALENDAR_ID}\n`);

  for (let i = 0; i < totalEvents; i++) {
    const template = mockEvents[i % mockEvents.length];
    const startDate = dates[i];
    const endDate = new Date(startDate.getTime() + template.duration * 60000);

    const event = {
      summary: template.summary,
      description: template.description,
      location: template.location,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: template.timeZone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: template.timeZone,
      },
    };

    try {
      const result = await calendar.events.insert({
        calendarId: CALENDAR_ID,
        requestBody: event,
      });
      console.log(
        `  [${i + 1}/${totalEvents}] Created: "${event.summary}" on ${startDate.toLocaleDateString()} at ${startDate.toLocaleTimeString()} — ${result.data.htmlLink}`
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`  [${i + 1}/${totalEvents}] Failed: "${event.summary}" — ${message}`);
    }
  }

  console.log('\nDone!');
}

main();
