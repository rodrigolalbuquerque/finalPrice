"use server";
import { createSupabaseRouteAndActionsClient } from "./utils/supabase/actions";

export async function getGroceriesData(id: number) {
  const supabase = createSupabaseRouteAndActionsClient();

  const { data, error } = await supabase.rpc("get_groceries_data", {
    input_groceries_id: id,
  });

  if (error) console.log(error);

  return data;
}
