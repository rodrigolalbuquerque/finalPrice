import { getGroceriesData } from "@/terte.action";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale"; // Correct import

// Define types for the groceries data
interface GroceryItem {
  product_id: number;
  product_name: string;
  groceries_id: number;
  groceries_date: string;
  price: number;
  market: string;
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
  const totalPrice = data.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto p-6">
      {/* Top section with date and market */}
      <h1 className="mb-4 text-2xl font-bold text-gray-800">
        {formatDateAndMarket(data[0].groceries_date, data[0].market)}
      </h1>

      {/* List of products and their prices */}
      <ul className="mb-4 rounded-lg bg-white p-4 shadow-lg">
        {data.map((item) => (
          <li
            key={item.product_id}
            className="flex justify-between border-b py-2"
          >
            <span className="text-gray-700">{item.product_name}</span>
            <span className="text-gray-900">{formatCurrency(item.price)}</span>
          </li>
        ))}
      </ul>

      {/* Total price */}
      <div className="text-right text-xl font-semibold text-gray-900">
        Total: {formatCurrency(totalPrice)}
      </div>
    </div>
  );
}
