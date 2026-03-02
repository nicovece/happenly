import { Dispatch, SetStateAction } from 'react';

// Google Calendar API event shape
// See: https://developers.google.com/calendar/api/v3/reference/events

export interface EventDateTime {
  dateTime: string;
  timeZone: string;
}

export interface EventPerson {
  email: string;
  self?: boolean;
}

export interface CalendarEvent {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  creator: EventPerson;
  organizer: EventPerson;
  start: EventDateTime;
  end: EventDateTime;
  recurringEventId: string;
  originalStartTime: EventDateTime;
  iCalUID: string;
  sequence: number;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}

// Google OAuth token info response
export interface TokenInfo {
  issued_to?: string;
  audience?: string;
  scope?: string;
  expires_in?: number;
  access_type?: string;
  error?: string;
}

// Component props

export interface AlertProps {
  text: string;
}

export interface EventProps {
  event: CalendarEvent;
}

export interface EventListProps {
  events?: CalendarEvent[];
}

export interface CitySearchProps {
  allLocations: string[];
  setCurrentCity: Dispatch<SetStateAction<string>>;
}

export interface NumberOfEventsProps {
  currentNOE: number;
  setCurrentNOE: Dispatch<SetStateAction<number>>;
}

export interface CityEventsChartProps {
  allLocations: string[];
  events: CalendarEvent[];
}

export interface EventGenresChartProps {
  events: CalendarEvent[];
}

// Chart data shapes

export interface CityChartData {
  city: string;
  count: number;
}

export interface GenreChartData {
  name: string;
  value: number;
}
