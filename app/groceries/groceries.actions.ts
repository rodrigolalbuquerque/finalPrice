"use server";
import { createSupabaseRouteAndActionsClient } from "@/utils/supabase/actions";

export async function getGroceriesData() {
  const supabase = createSupabaseRouteAndActionsClient();
  const { data, error } = await supabase
    .from("groceries")
    .select("id, date, market, finalPrice");

  if (!data || data.length < 1) {
    console.log("Error fetching data");
    return null;
  }

  if (error) console.log(error);

  return data;
}
