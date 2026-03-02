import { google } from 'googleapis';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events.public.readonly',
];

const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

const redirect_uris = [
  'https://itshappenly.vercel.app/',
  'http://localhost:3000/',
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

const calendar = google.calendar('v3');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

export const getAuthURL = async (): Promise<APIGatewayProxyResult> => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ authUrl }),
  };
};

export const getAccessToken = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const code = decodeURIComponent(`${event.pathParameters?.code}`);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify(tokens),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify(error),
    };
  }
};

export const getCalendarEvents = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const access_token = decodeURIComponent(
    `${event.pathParameters?.access_token}`
  );
  oAuth2Client.setCredentials({ access_token });

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      auth: oAuth2Client,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ events: response.data.items }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify(error),
    };
  }
};
