export default function Products() {
  const items = [
    {
      id: 1,
      name: "Product 1",
      minimumPrice: 10,
      maximumPrice: 20,
      averagePrice: 15,
    },
    {
      id: 2,
      name: "Product 2",
      minimumPrice: 30,
      maximumPrice: 50,
      averagePrice: 40,
    },
    {
      id: 3,
      name: "Product 3",
      minimumPrice: 5,
      maximumPrice: 15,
      averagePrice: 10,
    },
    // Add more items as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          Produtos cadastrados
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Nome do Produto
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Preço mínimo
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Preço máximo
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Preço médio
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-200 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    ${item.minimumPrice}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    ${item.maximumPrice}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    ${item.averagePrice}
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
