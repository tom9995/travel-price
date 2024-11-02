import { getClient } from "../lib/supabase";

const supabaseClient = getClient();

export const authRepository = {
  async signup(name: string, email: string, password: string) {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    // if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user?.user_metadata.name };
  },

  async signin(email: string, password: string) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    // if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user?.user_metadata.name };
  },

  async getCurrentUser() {
    const { data, error } = await supabaseClient.auth.getSession();
    // if (error != null) throw new Error(error.message);
    if (data.session == null) return;
    return {
      ...data.session.user,
      userName: data.session.user?.user_metadata.name,
    };
  },

  async signOut() {
    const { error } = await supabaseClient.auth.signOut();
    // if (error != null) throw new Error(error.message);
    return true;
  },
};
