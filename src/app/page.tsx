"use client";

import React from "react";
import "./globals.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  groceryList: string;
  zipCode: string;
};

export default function HomePage() {
  const { register, handleSubmit } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const queryString = new URLSearchParams({
      groceryList: data.groceryList,
      zipCode: data.zipCode,
    }).toString();

    router.push(`/stores?${queryString}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Find the Best Prices for Your Grocery List
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="groceryList"
          >
            Grocery List
          </label>
          <textarea
            id="groceryList"
            {...register("groceryList", { required: true })}
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
            {...register("zipCode", { required: true })}
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your zip code"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Find Stores
        </button>
      </form>
    </div>
  );
}
