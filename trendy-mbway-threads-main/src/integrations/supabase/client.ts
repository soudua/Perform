// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qhklkchzvvmxaaleumle.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoa2xrY2h6dnZteGFhbGV1bWxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTY3MTEsImV4cCI6MjA2NTk5MjcxMX0.WO1b2ZQ0lYbcU2JGXLajZuU7vFNK276aZlQG0g3qL9E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);