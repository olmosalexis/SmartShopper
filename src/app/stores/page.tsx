import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

type Item = {
  name: string;
  price: string;
};

export default function StoresPage() {
  const router = useRouter();
  const { groceryList, zipCode } = router.query;
  const [stores, setStores] = useState<{ id: number, name: string, total: number }[]>([]);

  useEffect(() => {
    if (groceryList && zipCode) {
      axios
        .get('/api/scrape', { params: { storeUrl: 'https://example.com' } })
        .then(response => {
          const items: Item[] = response.data.items;
          const total = items.reduce((sum: number, item: Item) => sum + parseFloat(item.price), 0);
          setStores([{ id: 1, name: 'Example Store', total }]);
        })
        .catch(error => {
          console.error('Error fetching store data:', error);
        });
    }
  }, [groceryList, zipCode]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stores Near {zipCode}</h2>
      <p className="mb-4">Showing prices for: {groceryList}</p>
      <ul className="space-y-4">
        {stores.map(store => (
          <li
            key={store.id}
            className="bg-white p-4 rounded shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/stores/${store.id}`)}
          >
            <h3 className="text-xl font-bold">{store.name}</h3>
            <p className="text-lg">Total: ${store.total.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
