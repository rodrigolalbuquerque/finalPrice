"use server";
import { Grocery } from "./app/page";
import { createSupabaseRouteAndActionsClient } from "./utils/supabase/actions";

export async function storeGrocery(grocery: Grocery) {
  const supabase = createSupabaseRouteAndActionsClient();

  const date = new Date(grocery.date);

  const {
    data: groceryData,
    status: groceryStatus,
    error: groceryError,
  } = await supabase
    .from("groceries")
    .insert({ date: date.toISOString() })
    .select("id");

  if (!groceryData || groceryData.length < 1 || !groceryData[0].id) {
    console.log("No Grocery id returned");
    return;
  }

  if (groceryError) console.log(groceryError);
  console.log(groceryStatus);

  for (let item of grocery.items) {
    const {
      data: productData,
      status: productStatus,
      error: productError,
    } = await supabase.from("product").insert({ name: item.name }).select("id");

    if (!productData || productData.length < 1 || !productData[0].id) {
      console.log("No Product id returned");
      return;
    }

    if (productError) console.log(productError);
    console.log(productStatus);

    const { status, error } = await supabase.from("groceries_product").insert({
      groceries_id: groceryData[0].id,
      product_id: productData[0].id,
      price: grocery.finalPrice,
      market: grocery.market,
    });

    if (error) console.log(error);
    console.log(status);
  }
}
