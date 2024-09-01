import React from 'react';
import { useRouter } from 'next/router';

const dummyStoreData = {
  1: { name: 'Walmart', items: [{ name: 'Milk', price: 3.99 }, { name: 'Eggs', price: 2.99 }] },
  2: { name: 'Kroger', items: [{ name: 'Milk', price: 4.29 }, { name: 'Eggs', price: 3.19 }] },
  3: { name: 'Target', items: [{ name: 'Milk', price: 4.05 }, { name: 'Eggs', price: 3.00 }] },
};

export default function StoreDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const storeId = typeof id === 'string' ? parseInt(id) : null;
  const store = storeId ? dummyStoreData[storeId as keyof typeof dummyStoreData] : null;

  if (!store) return <p>Store not found</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{store.name}</h2>
      <ul className="space-y-2">
        {store.items.map((item, index) => (
          <li key={index} className="bg-white p-2 rounded shadow-sm">
            <p className="text-lg">{item.name}: ${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
