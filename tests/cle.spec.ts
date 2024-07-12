import { test, expect } from '@playwright/test';
import {Login_id,login_password,cle_Id} from '../credentials/creds.js'

test('test Cle Logs', async ({ page }) => {
  const cle_query = `Business ID= ${cle_Id}`
  await page.goto('https://cle.dev.mypepsico.com/log/search-logs');
  await page.getByLabel('User ID - Email Address or').fill(Login_id);
  await page.getByRole('button', { name: 'log in' }).click();
  await page.getByLabel('Password').fill(login_password);
  await page.getByRole('button', { name: 'Verify' }).click();
  await page.getByText('Applications').click();
  await page.getByText('HHNX-PGT-QA').click();
  await page.getByRole('button', { name: 'DONE' }).click();
  await page.getByRole('switch', { name: 'CST Local' }).click();
  await page.getByTestId('autocompleteInput').fill(cle_query);
  await page.getByTestId('testid-quickPicker-btn').click();
  await page.getByText('Last 30 Days').click();
  await screenshot(({page}),0)
  await page.getByTestId('submitSearchBtn').click();
  const no_rec = page.locator('div').filter({ hasText: 'No Records found!' }).nth(1)
  await page.waitForTimeout(3000);
  if(await no_rec.isVisible({timeout:15000})){
    await screenshot(({page}),1)
    await page.locator('a').nth(2).click();
    console.log('NO Records Found');
  }
  else{
    console.log('Records Found');
    await screenshot(({page}),1)
    const sucess_log = page.getByRole('gridcell', { name: 'Document successfully' }).first();
    if(await sucess_log.isVisible({timeout:15000})){
      console.log('Records Found with sucess log');
      await sucess_log.dblclick();
      await page.getByTestId('test-id-log-exception-detail-wrapper').getByText('Document successfully').click();
      await screenshot(({page}),2)
    }
    else{
      console.log('Records Found but No sucess log');
      await screenshot(({page}),3)
    }
  }
  
  console.log('close');
  
});

async function screenshot({page},i){
  let x= "Latest_CLE_Snips/Screenshot" + i.toString() + ".png"
  await page.screenshot({ path: x});
}


test.only('test_ci', async ({ page }) => {
  await page.goto('https://www.hotstar.com/in/sports/cricket/tournaments/icc-mens-t20-world-cup-2024/1260164072/sa-crush-afg-to-enter-maiden-wc-final/1540029922/sports-match-highlights/watch');
});