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
  async creatParticipants(travelId: number, personId: number) {
    const { error } = await supabase
      .from("participants")
      .insert({ travel_id: travelId, person_id: personId });
    if (error != null) {
      throw new Error(error.message);
    }
    //   return data[0];
  },
  async getAllPerson(travelId: number) {
    // console.log(travelId);
    const { data, error } = await supabase
      .from("person")
      .select("*,participants!inner(travel_id)")
      .eq("participants.travel_id", travelId)
      .eq("participants.is_deleted", false)
      .eq("is_deleted", false)
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
  async update(person_id: number, person_name: string, is_deleted: boolean) {
    const { data, error } = await supabase
      .from("person")
      .update({ person_name, is_deleted })
      .eq("person_id", person_id)
      .select();

    if (error != null) {
      throw new Error(error.message);
    }
    return data.map((person) => {
      return {
        ...person,
      };
    });
  },
  async updateParticipants(person_id: number, is_deleted: boolean) {
    const { data, error } = await supabase
      .from("participants")
      .update({ is_deleted })
      .eq("person_id", person_id)
      .select();

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
