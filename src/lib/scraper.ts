import puppeteer from "puppeteer";

export async function scrapeStoreData(storeUrl: string) {
  console.log("Scraping data from:", storeUrl);
  // Add browser launch options
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode (no UI)
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Add sandbox args for security
  });

  const page = await browser.newPage();

  try {
    await page.goto(storeUrl, { waitUntil: "networkidle2" });

    const items = await page.evaluate(() => {
      const itemElements = document.querySelectorAll(".item-selector");
      return Array.from(itemElements).map((item) => {
        const name = item.querySelector(".name-selector")?.textContent || "";
        const price = item.querySelector(".price-selector")?.textContent || "";
        return { name, price };
      });
    });

    console.log("Scraped items:", items);
    return items;
  } catch (error) {
    console.error("Error scraping store data:", error);
    return [];
  } finally {
    await browser.close(); // Ensure the browser is closed even if an error occurs
  }
}
