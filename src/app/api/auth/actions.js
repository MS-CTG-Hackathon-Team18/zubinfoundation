'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function sendSignInOtp(phone) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      // channel: 'whatsapp',
      shouldCreateUser: false,
    },
  });

  return error ? { success: false, error } : { success: true, data };
};

export async function sendSignUpOtp(phone, userData) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    phone,
    options: {
      data: userData
    },
  });

  return error ? { success: false, error } : { success: true, data };
};

export async function verifyOtp(phone, password) {
  const supabase = createClient();
  const {
    data: { session },
    error
  } = await supabase.auth.verifyOtp({
    phone,
    token: password,
    type: "sms",
  })

  return error ? { success: false, error } : { success: true, session };
  revalidatePath('/', 'layout')
  redirect('/')
};
