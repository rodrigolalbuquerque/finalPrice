"use client";

import { useRouter } from "next/navigation";

export default function Groceries() {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/groceries/${id}`);
  };

  const groceries = [
    {
      id: 1,
      date: "2024-08-09",
      market: "Mundial",
      price: 15.9,
    },
    {
      id: 2,
      date: "2024-07-05",
      market: "Guanabara",
      price: 40.15,
    },
    {
      id: 3,
      date: "2024-06-02",
      market: "Rio Sul",
      price: 10.24,
    },
    // Add more groceries as needed
  ];

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
              {groceries.map((item, index) => (
                <tr
                  onClick={() => handleRowClick(`${item.id}`)}
                  key={index}
                  className="cursor-pointer border-t border-gray-200 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-gray-800">{item.date}</td>
                  <td className="px-4 py-3 text-gray-600">{item.market}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(item.price)}
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
