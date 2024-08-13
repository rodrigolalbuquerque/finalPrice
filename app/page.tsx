"use client";
import { storeGrocery } from "@/homepage.actions";
import { useState, useEffect } from "react";
import { useRef } from "react";

export interface Item {
  name: string;
  quantity: number;
  price: number;
  isEditingPrice?: boolean; // New property to track if the price is being edited
}

export interface Grocery {
  date: string;
  items: Item[];
  finalPrice: number;
  market: string;
}

export default function Home() {
  const [date, setDate] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const [tempPrice, setTempPrice] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const priceInputRef = useRef<HTMLInputElement | null>(null);
  const [market, setMarket] = useState<string>(""); // New state for market

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priceInputRef.current &&
        !priceInputRef.current.contains(event.target as Node)
      ) {
        const updatedItems = items.map((item) => ({
          ...item,
          isEditingPrice: false,
        }));
        setItems(updatedItems);
        setTempPrice(null);
      }
    };

    if (items.some((item) => item.isEditingPrice)) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [items]);

  useEffect(() => {
    const storedDate = localStorage.getItem("selectedDate");
    const storedItems = localStorage.getItem("itemsList");

    if (storedDate) {
      setDate(storedDate);
    }

    if (storedItems && storedItems !== "[]") {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedDate", date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem("itemsList", JSON.stringify(items));
  }, [items]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleAddItem = () => {
    if (itemName.trim() === "") return;

    const newItem: Item = {
      name: itemName,
      quantity: 0,
      price: 0, // Initialize price as a number
    };
    setItems([...items, newItem]);
    setItemName("");
  };

  const handleMarketChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarket(e.target.value); // Handle market input change
  };

  const handleQuantityChange = (index: number, value: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = value;
    setItems(updatedItems);
  };

  const handleIncrement = (index: number) => {
    handleQuantityChange(index, items[index].quantity + 1);
  };

  const handleDecrement = (index: number) => {
    if (items[index].quantity > 0) {
      handleQuantityChange(index, items[index].quantity - 1);
    }
  };

  const handleTogglePriceEditing = (index: number) => {
    if (!items[index].isEditingPrice) {
      setTempPrice(items[index].price);
    } else {
      setTempPrice(null);
    }

    const updatedItems = [...items];
    updatedItems[index].isEditingPrice = !updatedItems[index].isEditingPrice;
    setItems(updatedItems);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempPrice(parseFloat(e.target.value));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Enter") {
      if (tempPrice !== null) {
        const updatedItems = [...items];
        updatedItems[index].price = tempPrice;
        updatedItems[index].isEditingPrice = false;
        setItems(updatedItems);
        setTempPrice(null);
      }
    } else if (e.key === "Escape") {
      handleTogglePriceEditing(index);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDeletion = () => {
    setItems([]);
    setDate("");
    setIsDeleteModalOpen(false);
  };

  const cancelDeletion = () => {
    setIsDeleteModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleFinalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFinalPrice(parseFloat(e.target.value));
  };

  const handleRegisterPurchase = async () => {
    const grocery: Grocery = {
      date,
      items,
      finalPrice,
      market,
    };
    await storeGrocery(grocery);
    // setItems([]);
    // setDate("");
    // setIsRegisterModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center">
        <label htmlFor="dateInput" className="mr-2 text-sm font-medium">
          Data:
        </label>
        <input
          type="date"
          id="dateInput"
          value={date}
          onChange={handleDateChange}
          className="rounded border p-2"
        />
      </div>

      <div className="mt-4 flex w-[1200px] items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            maxLength={50}
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Adicionar item"
            className="rounded border p-2"
          />
          <button
            onClick={handleAddItem}
            className="rounded bg-blue-500 p-2 text-white"
          >
            Add
          </button>
        </div>
        <button
          onClick={openRegisterModal}
          className="rounded bg-blue-500 p-2 text-white"
        >
          Cadastrar compra
        </button>
      </div>

      <div className="mt-6 flex w-[1200px] justify-center">
        <table className="w-full table-fixed rounded-lg border border-gray-200 bg-white shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="w-[50%] px-4 py-3 text-left font-semibold text-gray-700">
                Nome
              </th>
              <th className="w-[25%] px-4 py-3 text-left font-semibold text-gray-700">
                Quantidade
              </th>
              <th className="w-[20%] px-4 py-3 text-left font-semibold text-gray-700">
                Preço
              </th>
              <th className="w-[10%] px-4 py-3 text-right font-semibold text-gray-700"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 hover:bg-slate-50"
              >
                <td className="truncate px-4 py-3 text-gray-800">
                  {item.name}
                </td>
                <td className="flex items-center px-4 py-3">
                  <button
                    onClick={() => handleDecrement(index)}
                    className="mr-1 h-6 w-6 rounded bg-gray-200 text-gray-800"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value, 10))
                    }
                    className="w-12 rounded border p-1 text-center text-gray-800"
                    min={0}
                    max={99}
                  />
                  <button
                    onClick={() => handleIncrement(index)}
                    className="ml-1 h-6 w-6 rounded bg-gray-200 text-gray-800"
                  >
                    +
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {item.isEditingPrice ? (
                    <input
                      type="number"
                      value={tempPrice !== null ? tempPrice : item.price}
                      onChange={handlePriceChange}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-24 rounded border p-1 text-center text-gray-800"
                      autoFocus
                      ref={priceInputRef}
                    />
                  ) : (
                    <span
                      className="cursor-pointer hover:text-blue-500"
                      onClick={() => handleTogglePriceEditing(index)}
                    >
                      {formatPrice(item.price)}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => {
                      const updatedItems = items.filter((_, i) => i !== index);
                      setItems(updatedItems);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleDeleteClick}
        className="mt-6 rounded bg-red-600 p-2 text-white"
      >
        Apagar compra
      </button>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[30rem] rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-bold">
              Tem certeza que deseja apagar a compra?
            </h2>

            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDeletion}
                className="rounded bg-gray-300 px-4 py-2"
              >
                Não
              </button>

              <button
                onClick={confirmDeletion}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Purchase Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <label
              htmlFor="finalPriceInput"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Preço Final:
            </label>
            <input
              type="number"
              id="finalPriceInput"
              value={finalPrice}
              onChange={handleFinalPriceChange}
              className="mb-4 w-full rounded border p-2"
              placeholder="Digite o preço final"
            />

            <label
              htmlFor="marketInput"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mercado:
            </label>
            <input
              type="text"
              id="marketInput"
              value={market}
              onChange={handleMarketChange}
              className="mb-4 w-full rounded border p-2"
              placeholder="Digite o nome do mercado"
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeRegisterModal}
                className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleRegisterPurchase}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
