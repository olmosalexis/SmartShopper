import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { groceryList, zipCode } = req.query;

  // Placeholder for scraping logic
  res.status(200).json({ message: 'Scraping not yet implemented' });
}
git 