"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

type FormData = {
  groceryList: string;
  zipCode: string;
};

export default function HomePage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    // Construct the query string manually
    const queryString = new URLSearchParams({
      groceryList: data.groceryList,
      zipCode: data.zipCode,
    }).toString();

    // Use router.push with a full URL string
    router.push(`/stores?${queryString}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Find the Best Prices for Your Grocery List</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="groceryList">
            Grocery List
          </label>
          <textarea
            id="groceryList"
            {...register('groceryList', { required: true })}
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
            placeholder="Enter your grocery items, separated by commas"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            id="zipCode"
            {...register('zipCode', { required: true })}
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your zip code"
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Find Stores
        </button>
      </form>
    </div>
  );
}
