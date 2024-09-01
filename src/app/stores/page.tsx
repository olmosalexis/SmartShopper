import React from 'react';
import { useRouter } from 'next/router';

const dummyData = [
  { id: 1, name: 'Walmart', total: 45.99 },
  { id: 2, name: 'Kroger', total: 47.50 },
  { id: 3, name: 'Target', total: 46.75 },
];

export default function StoresPage() {
  const router = useRouter();
  const { groceryList, zipCode } = router.query;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stores Near {zipCode}</h2>
      <p className="mb-4">Showing prices for: {groceryList}</p>
      <ul className="space-y-4">
        {dummyData.map(store => (
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
