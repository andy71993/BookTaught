import { supabase } from './supabase';
import { UserProgress } from './types';

export async function markChapterComplete(
  userId: string,
  bookId: string,
  chapterId: string
): Promise<void> {
  const { error } = await supabase
    .from('user_progress')
    .upsert(
      {
        user_id: userId,
        book_id: bookId,
        chapter_id: chapterId,
        completed: true,
        completed_at: new Date().toISOString(),
        last_accessed_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,chapter_id',
      }
    );

  if (error) throw error;
}

export async function trackChapterAccess(
  userId: string,
  bookId: string,
  chapterId: string
): Promise<void> {
  const { error } = await supabase
    .from('user_progress')
    .upsert(
      {
        user_id: userId,
        book_id: bookId,
        chapter_id: chapterId,
        last_accessed_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,chapter_id',
      }
    );

  if (error) throw error;
}

export async function getUserProgress(
  userId: string
): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('last_accessed_at', { ascending: false });

  if (error) throw error;

  // Map snake_case database columns to camelCase TypeScript interface
  return (data || []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    bookId: row.book_id,
    chapterId: row.chapter_id,
    completed: row.completed,
    lastAccessedAt: row.last_accessed_at,
  }));
}

export async function getBookProgress(
  userId: string,
  bookId: string
): Promise<UserProgress[]> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('book_id', bookId);

  if (error) throw error;

  // Map snake_case database columns to camelCase TypeScript interface
  return (data || []).map((row: any) => ({
    id: row.id,
    userId: row.user_id,
    bookId: row.book_id,
    chapterId: row.chapter_id,
    completed: row.completed,
    lastAccessedAt: row.last_accessed_at,
  }));
}

export async function isChapterCompleted(
  userId: string,
  chapterId: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('completed')
    .eq('user_id', userId)
    .eq('chapter_id', chapterId)
    .single();

  if (error) return false;
  return data?.completed || false;
}
