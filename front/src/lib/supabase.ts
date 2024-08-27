// <reference types="vite/client" />

import {createClient} from "@supabase/supabase-js";
import {Database} from "@/types/supabase";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);
