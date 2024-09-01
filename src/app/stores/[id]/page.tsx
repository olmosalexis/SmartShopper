import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function StoreDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState<{ name: string, price: string }[]>([]);

  useEffect(() => {
    if (id) {
      axios
        .get('/api/scrape', { params: { storeUrl: `https://example.com/store/${id}` } })
        .then(response => {
          setItems(response.data.items);
        })
        .catch(error => {
          console.error('Error fetching store details:', error);
        });
    }
  }, [id]);

  if (!items.length) return <p>Store not found</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Store Details</h2>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="bg-white p-2 rounded shadow-sm">
            <p className="text-lg">{item.name}: ${parseFloat(item.price).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
