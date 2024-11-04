import { getClient } from "../lib/supabase";

const supabase = getClient();

export const personRepository = {
  async create(person_name: string) {
    const { data, error } = await supabase
      .from("person")
      .insert([{ person_name }])
      .select();

    if (error != null) {
      throw new Error(error.message);
    }
    return data[0];
  },

  async getAllPerson() {
    const { data, error } = await supabase
      .from("person")
      .select("*")
      .order("created_at", { ascending: true });

    if (error != null) {
      throw new Error(error.message);
    }
    return data.map((person) => {
      return {
        ...person,
      };
    });
  },
};
