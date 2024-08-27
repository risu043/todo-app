// import {supabase} from "@/lib/supabase";
import {supabase} from "../lib/supabase";

export const signUp = async (email: string, password: string) => {
  const {data, error} = await supabase.auth.signUp({email, password});
  if (error) {
    throw error;
  }
  return data;
};

export const signIn = async (email: string, password: string) => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
};

export const getCurrentUser = async () => {
  const {data} = await supabase.auth.getUser();
  return data.user;
};

export const signOut = async () => {
  const {error} = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
};
