import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  isPaidMember: boolean;
}

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });

  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch user profile to get isPaidMember status
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_paid_member')
    .eq('id', user.id)
    .single();

  return {
    id: user.id,
    email: user.email!,
    isPaidMember: profile?.is_paid_member || false,
  };
}

export async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}
