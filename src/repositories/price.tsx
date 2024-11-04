import { getClient } from "../lib/supabase";

const supabase = getClient();

export const priceRepository = {
  async create(
    price: string,
    price_title: string,
    price_detail: string,
    person_id: number
  ) {
    const { data, error } = await supabase
      .from("price")
      .insert([{ price, price_title, price_detail, person_id }])
      .select();

    if (error != null) {
      throw new Error(error.message);
    }
    return data[0];
  },
};

//   async getAllTravel() {
//     const { data, error } = await supabase
//       .from("travel")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error != null) {
//       throw new Error(error.message);
//     }
//     return data.map((travel) => {
//       return {
//         ...travel,
//       };
//     });
//   },

//   async delete(id: number) {
//     const { error } = await supabase.from("travel").delete().eq("id", id);
//     if (error != null) {
//       throw new Error(error.message);
//     }
//     return true;
//   },
// };
