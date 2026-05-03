import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vdtpplqbeilbpbmidapd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdHBwbHFiZWlsYnBibWlkYXBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3MzY4OTksImV4cCI6MjA5MzMxMjg5OX0.6iPWmz9qJ2rba0-O6X0THbf9WZdjv4df1lBv1I2lVRs';

export const supabase = createClient(supabaseUrl, supabaseKey);
