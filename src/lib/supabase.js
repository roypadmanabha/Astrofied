import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tbavyzcyjkkxnhctkiwo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiYXZ5emN5amtreG5oY3RraXdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNjg5ODgsImV4cCI6MjA5MzY0NDk4OH0.a0cMgX9qDRzOKujWkVpzau0b-frV6tPCZeyvAYJ9hbc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
