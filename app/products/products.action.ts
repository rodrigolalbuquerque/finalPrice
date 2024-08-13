"use server";
import { createSupabaseRouteAndActionsClient } from "@/utils/supabase/actions";

export async function getProductsData() {
  const supabase = createSupabaseRouteAndActionsClient();
  const { data, error } = await supabase.rpc("get_product_price_stats");
  if (error) console.log(error);
  return data;
}
