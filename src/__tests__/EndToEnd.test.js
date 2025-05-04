/**
 * @jest-environment node
 */
import puppeteer from 'puppeteer';
describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
<<<<<<< HEAD
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250,
    //   timeout: 0,
    // });
=======
>>>>>>> origin/4_6_ua_and_ete_test
    page = await browser.newPage();
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.event');
  });
  afterAll(async () => {
    await browser.close();
  });
<<<<<<< HEAD
  test('Event element details box is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  }, 10000); // 10 seconds
=======
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });
>>>>>>> origin/4_6_ua_and_ete_test
  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeDefined();
<<<<<<< HEAD
  }, 10000); // 10 seconds
  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    await page.waitForSelector('.event .details', { hidden: true });
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  }, 10000); // 10 seconds
=======
  });
>>>>>>> origin/4_6_ua_and_ete_test
});
