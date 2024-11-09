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
      .insert([{ price, price_title, price_detail, person_id, is_paid: false }])
      .select();

    if (error != null) {
      throw new Error(error.message);
    }
    return data[0];
  },
  async getAllPrice() {
    const { data, error } = await supabase
      .from("price")
      .select("*")
      .order("created_at", { ascending: false });

    if (error != null) {
      throw new Error(error.message);
    }
    return data.map((price) => {
      return {
        ...price,
      };
    });
  },
  async getAllPriceAndPerson() {
    const { data, error } = await supabase
      .from("price")
      .select("*,person(*)")
      .order("person(created_at)", { ascending: true })
      .order("price_id");

    if (error != null) {
      throw new Error(error.message);
    }
    return data.map((price) => {
      return {
        ...price,
      };
    });
  },
  async updateIsPaid(priceId: string, isPaid: boolean) {
    const { data, error } = await supabase
      .from("price")
      .update({
        is_paid: isPaid,
      })
      .eq("price_id", priceId)
      .select();

    if (error != null) {
      throw new Error(error.message);
    }
    return data.map((price) => {
      return {
        ...price,
      };
    });
  },
};
