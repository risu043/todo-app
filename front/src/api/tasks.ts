import {supabase} from "../lib/supabase";

export const getTasks = async () => {
  const {data, error} = await supabase
    .from("tasks")
    .select()
    .order("created_at");
  if (error) {
    throw error;
  }
  return data;
};

export const createTask = async (title: string) => {
  const {error} = await supabase.from("tasks").insert({title});
  if (error) {
    throw error;
  }
};

export const updateTask = async (id: number) => {
  const {error} = await supabase.from("tasks").update({status: 1}).eq("id", id);
  if (error) {
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  const {error} = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    throw error;
  }
};
