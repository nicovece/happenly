import mockData from './mock-data';
import { CalendarEvent } from './types';

const API_BASE =
  'https://ymaled62u1.execute-api.eu-central-1.amazonaws.com/dev/api';

export const extractLocations = (events: CalendarEvent[]): string[] => {
  const extractedLocations = events.map(event => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const getEvents = async (): Promise<CalendarEvent[]> => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  try {
    const response = await fetch(`${API_BASE}/get-public-events`);
    if (!response.ok) {
      return mockData;
    }
    const result = await response.json();
    if (result?.events) {
      return result.events;
    }
  } catch {
    // Fall back to mock data if the API is unreachable
  }

  return mockData;
};
