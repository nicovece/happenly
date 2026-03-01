import mockData from './mock-data';
import { CalendarEvent, TokenInfo } from './types';

export const extractLocations = (events: CalendarEvent[]): string[] => {
  const extractedLocations = events.map(event => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

const checkToken = async (accessToken: string): Promise<TokenInfo> => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result: TokenInfo = await response.json();
  return result;
};

const removeQuery = (): void => {
  let newurl: string;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.pushState('', '', newurl);
  } else {
    newurl = window.location.protocol + '//' + window.location.host;
    window.history.pushState('', '', newurl);
  }
};

export const getEvents = async (): Promise<CalendarEvent[]> => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem('lastEvents');
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      'https://ymaled62u1.execute-api.eu-central-1.amazonaws.com/dev/api/get-events' +
      '/' +
      token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      localStorage.setItem('lastEvents', JSON.stringify(result.events));
      return result.events;
    }
  }

  return [];
};

export const getAccessToken = async (): Promise<string | null> => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));
  if (!accessToken || (tokenCheck && tokenCheck.error)) {
    localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    if (!code) {
      const response = await fetch(
        'https://ymaled62u1.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url'
      );
      const result = await response.json();
      const { authUrl } = result;
      window.location.href = authUrl;
      return null;
    }
    return code ? getToken(code) : null;
  }
  return accessToken;
};

const getToken = async (code: string): Promise<string | null> => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://ymaled62u1.execute-api.eu-central-1.amazonaws.com/dev/api/token' +
      '/' +
      encodeCode
  );
  const { access_token } = await response.json();
  if (access_token) {
    localStorage.setItem('access_token', access_token);
  }

  return access_token;
};
