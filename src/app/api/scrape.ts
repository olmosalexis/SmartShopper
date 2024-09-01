import type { NextApiRequest, NextApiResponse } from 'next';
import { scrapeStoreData } from '@/lib/scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { storeUrl } = req.query;

  if (typeof storeUrl !== 'string') {
    return res.status(400).json({ error: 'Invalid store URL' });
  }

  try {
    const items = await scrapeStoreData(storeUrl);
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape store data' });
  }
}
