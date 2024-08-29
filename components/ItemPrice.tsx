"use client";

import { GroceryItem } from "@/app/groceries/[id]/page";
import { useState } from "react";

export default function ItemPrice({ item }: { item: GroceryItem }) {
  const [showUnitPrice, setShowUnitPrice] = useState(false);

  const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <span
      className="cursor-default hover:rounded-sm hover:bg-orange-300 hover:p-1 hover:font-semibold"
      onMouseEnter={() => setShowUnitPrice(true)}
      onMouseLeave={() => setShowUnitPrice(false)}
    >
      {showUnitPrice
        ? item.quantity
          ? `${formatCurrency(item.price)}/und.`
          : `${formatCurrency(item.price)}/kg.`
        : formatCurrency(
            item.price * (item.quantity ? item.quantity : item.kilograms!),
          )}
    </span>
  );
}
