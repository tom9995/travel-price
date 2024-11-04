import { getClient } from "../lib/supabase";

const supabase = getClient();

export const travelRepository = {
  async create(travel_name: String) {
    const { data, error } = await supabase
      .from("travel")
      .insert([{ travel_name }])
      .select();

    if (error != null) {
      throw new Error(error.message);
    }
    return data[0];
  },

  async getAllTravel() {
    const { data, error } = await supabase
      .from("travel")
      .select("*")
      .order("created_at", { ascending: false });

    if (error != null) {
      throw new Error(error.message);
    }
    return data.map((travel) => {
      return {
        ...travel,
      };
    });
  },

  async delete(id: number) {
    const { error } = await supabase.from("travel").delete().eq("id", id);
    if (error != null) {
      throw new Error(error.message);
    }
    return true;
  },
};
