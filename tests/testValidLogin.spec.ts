import { test, expect } from '@playwright/test';
import * as config from '../config.json';

let validUser = config.validUser;

test('Valid Login', async ({ page }) => {
  await page.goto('https://www.draiver.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  const page1 = await page1Promise;
  await page1.getByPlaceholder('Username').fill(validUser.username);
  await page1.getByPlaceholder('Password').fill(validUser.password);
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page1.locator('#app')).toContainText('Please download the DRAIVER app on your mobile device and Create An Account to complete your registration.');
});