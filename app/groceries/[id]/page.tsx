import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale"; // Correct import
import { getGroceriesData } from "./groceryDetails.actions";

// Define types for the groceries data
interface GroceryItem {
  product_id: number;
  product_name: string;
  groceries_date: string;
  price: number;
  market: string;
  quantity: number;
  finalprice: number;
}

// Define props type for the component
interface GroceriesPageProps {
  params: {
    id: string;
  };
}

// Helper function to format the date and market
const formatDateAndMarket = (dateStr: string, market: string): string => {
  const date = parseISO(dateStr);
  // Ensure the date is correctly parsed and formatted
  const formattedDate = format(date, "eeee, dd MMMM", { locale: ptBR });
  return `${formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)} - ${market}`;
};

// Helper function to format the price as Brazilian currency
const formatCurrency = (price: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};

export default async function GroceriesPage({ params }: GroceriesPageProps) {
  const { id } = params;

  // Fetch data based on the dynamic ID
  const data: GroceryItem[] | null = await getGroceriesData(+id);

  if (!data || data.length === 0) {
    return notFound();
  }

  // Calculate the total price
  const totalPrice = data[0].finalprice;

  return (
    <div className="container mx-auto w-[1000px] p-6">
      {/* Top section with date and market */}
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        {formatDateAndMarket(data[0].groceries_date, data[0].market)}
      </h1>

      {/* Table for products */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="border-b bg-gray-200">
              <th className="w-[50%] px-6 py-3 text-left  font-semibold text-gray-700">
                Nome
              </th>
              <th className="w-[25%] px-6 py-3 text-left  font-semibold text-gray-700">
                Quantidade
              </th>
              <th className="w-[25%] px-6 py-3 text-right  font-semibold text-gray-700">
                Preço da unidade
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.product_id} className="border-b">
                <td className="w-[50%] px-6 py-4 text-gray-700">
                  {item.product_name}
                </td>
                <td className="w-[25%] px-6 py-4 pl-14 text-gray-700">
                  {`x${item.quantity}`}
                </td>
                <td className="w-[25%] px-6 py-4 text-right text-gray-900">
                  {formatCurrency(item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total price */}
      <div className="mt-4 text-right text-xl font-semibold text-gray-900">
        Total: {formatCurrency(totalPrice)}
      </div>
    </div>
  );
}
