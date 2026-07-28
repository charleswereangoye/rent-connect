import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const SUPABASE_URL = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)[1];
const SUPABASE_ANON_KEY = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/)[1];

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'charleswereangoye@gmail.com',
    password: '@AngoyeJnr03560'
  });

  if (error) {
    console.error("Login failed:", error.message);
  } else {
    console.log("Login successful!");
    console.log("User ID:", data.user.id);
    console.log("User Metadata:", data.user.user_metadata);
    
    // Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
      
    if (profileError) {
      console.log("Profile not found in public.profiles. Error:", profileError.message);
    } else {
      console.log("Profile found in public.profiles:", profile);
    }
  }
}

testLogin();
