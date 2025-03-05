import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_API_BASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
