import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://gmmzbnaxwkihfdftybyh.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtbXpibmF4d2tpaGZkZnR5YnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NDU4NTcsImV4cCI6MjA1NTAyMTg1N30.HskekXUaYsdSPUTM7M3EFzZwcMyXTxROlTUagoxpE44"
);

export default supabase;
