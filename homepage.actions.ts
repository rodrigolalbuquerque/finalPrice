"use server";
import { Grocery } from "./app/page";
import { createSupabaseRouteAndActionsClient } from "./utils/supabase/actions";

function adjustPrices(grocery: Grocery): Grocery {
  // Calculate the total original price by summing the prices of all items
  const totalOriginalPrice = grocery.items.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  if (totalOriginalPrice === 0) {
    throw new Error(
      "Total original price is zero, cannot adjust prices proportionally.",
    );
  }

  // Calculate the adjustment factor based on the ratio of finalPrice to totalOriginalPrice
  const adjustmentFactor = grocery.finalPrice / totalOriginalPrice;

  // Adjust the price of each item based on the adjustment factor
  const adjustedItems = grocery.items.map((item) => {
    // Adjusted total price for the item
    const adjustedTotalPrice = item.price * adjustmentFactor;

    // Adjusted price per unit of the item
    const adjustedUnitPrice = item.quantity
      ? adjustedTotalPrice / item.quantity
      : adjustedTotalPrice / item.kilograms!;

    return {
      ...item,
      price: +adjustedUnitPrice.toFixed(2), // Adjusted total price for the given quantity
    };
  });

  return {
    ...grocery,
    items: adjustedItems,
  };
}

export async function storeGrocery(rawGrocery: Grocery) {
  const supabase = createSupabaseRouteAndActionsClient();
  const grocery = adjustPrices(rawGrocery);

  const date = new Date(grocery.date);

  const {
    data: groceryData,
    status: groceryStatus,
    error: groceryError,
  } = await supabase
    .from("groceries")
    .insert({
      date: date.toISOString(),
      market: grocery.market,
      final_price: grocery.finalPrice,
    })
    .select("id");

  if (groceryError) console.log(groceryError);
  console.log(groceryStatus);

  if (!groceryData || groceryData.length < 1 || !groceryData[0].id) {
    console.log("No Grocery id returned");
    return;
  }

  for (let item of grocery.items) {
    let itemId;

    if (item.id) {
      itemId = item.id;
    } else {
      const {
        data: productData,
        status: productStatus,
        error: productError,
      } = await supabase
        .from("product")
        .insert({ name: item.name })
        .select("id");

      if (!productData || productData.length < 1 || !productData[0].id) {
        console.log("No Product id returned");
        return;
      }

      if (productError) console.log(productError);
      console.log(productStatus);

      itemId = productData[0].id;
    }

    const { error } = await supabase.from("groceries_product").insert({
      groceries_id: groceryData[0].id,
      product_id: itemId,
      price: item.price,
      quantity: item.quantity,
      kilograms: item.kilograms,
    });

    if (error) console.log(error);
  }
}

export async function getProductsNamesList() {
  const supabase = createSupabaseRouteAndActionsClient();
  const { data, error } = await supabase.from("product").select("name, id");

  if (error) console.log(error);

  return data;
}
