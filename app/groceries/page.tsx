"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getGroceriesData } from "./groceries.actions";

type groceryDataT =
  | {
      id: number;
      date: string | null;
      market: string | null;
      final_price: number | null;
    }[]
  | null;

export default function Groceries() {
  const [grocery, setGrocery] = useState<groceryDataT>(null);
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await getGroceriesData();
    setGrocery(data);
  }

  const handleRowClick = (id: string) => {
    router.push(`/groceries/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Compras cadastradas
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Data
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Mercado
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Valor da compra
                </th>
              </tr>
            </thead>
            <tbody>
              {grocery &&
                grocery.map((item, index) => (
                  <tr
                    onClick={() => handleRowClick(`${item.id}`)}
                    key={index}
                    className="cursor-pointer border-t border-gray-200 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-gray-800">{item.date}</td>
                    <td className="px-4 py-3 text-gray-600">{item.market}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {item.final_price &&
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(item.final_price)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
