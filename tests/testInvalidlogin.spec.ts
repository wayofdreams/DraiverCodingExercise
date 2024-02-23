import { test, expect } from '@playwright/test';
import * as config from '../config.json';

let validUser = config.validUser;
let invalidUser = config.invalidUser;

test('Invalid Login Attempt', async ({ page }) => {
  await page.goto('https://www.draiver.com/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'LOGIN' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page1.getByText('Please enter your email.')).toBeVisible();
  await expect(page1.getByText('Please enter your password.')).toBeVisible();
  await page1.getByPlaceholder('Username').fill(invalidUser.username);
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page1.getByText('Please enter your password.')).toBeVisible();
  await page1.getByPlaceholder('Password').fill(invalidUser.password);
  await page1.getByPlaceholder('Username').fill('');
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page1.getByText('Please enter your email.')).toBeVisible();
  await page1.getByPlaceholder('Username').fill(invalidUser.username);
  //Next check requieres clicking twice on the button.
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page1.getByText('Username not found.')).toBeVisible();
  await page1.getByPlaceholder('Username').fill(validUser.username);
  await page1.getByRole('button', { name: 'LOG IN' }).click();
  await expect(page1.getByText('Please check password and')).toBeVisible();
});