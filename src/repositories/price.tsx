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
  async getAllPrice(travelId: number) {
    const perosnList = await supabase
      .from("participants")
      .select("*")
      .eq("travel_id", travelId)
      .eq("is_deleted", false);
    const perosnIds = perosnList.data?.map((person) => person.person_id);

    const { data, error } = await supabase
      .from("price")
      .select("*")
      .in("person_id", perosnIds ?? [])
      .eq("is_deleted", false)
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
  async getAllPriceAndPerson(travelId: number) {
    const perosnList = await supabase
      .from("participants")
      .select("*")
      .eq("travel_id", travelId)
      .eq("is_deleted", false);
    const perosnIds = perosnList.data?.map((person) => person.person_id);

    const { data, error } = await supabase
      .from("price")
      .select("*,person!inner(*,participants!inner(*))")
      .eq("person.participants.travel_id", travelId)
      .eq("is_deleted", false)
      .in("person.participants.person_id", perosnIds ?? [])
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
  async updatePriceAndPerson(
    price_id: number,
    is_deleted?: boolean,
    price?: string,
    price_title?: string,
    person_id?: string
  ) {
    const { error } = await supabase
      .from("price")
      .update({
        price,
        price_title,
        person_id,
        is_deleted,
      })
      .eq("price_id", price_id)
      .select();
    if (error != null) {
      throw new Error(error.message);
    }
  },
};
