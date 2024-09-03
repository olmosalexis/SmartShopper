import puppeteer from 'puppeteer';

export async function scrapeStoreData(storeUrl: string) {
  console.log('Scraping data from:', storeUrl);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(storeUrl);

  const items = await page.evaluate(() => {
    const itemElements = document.querySelectorAll('.item-selector');
    return Array.from(itemElements).map(item => {
      const name = item.querySelector('.name-selector')?.textContent || '';
      const price = item.querySelector('.price-selector')?.textContent || '';
      return { name, price };
    });
  });

  console.log('Scraped items:', items);
  await browser.close();
  return items;
}
