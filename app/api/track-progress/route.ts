import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bookId, chapterId, completed } = await request.json();

    // Upsert progress
    const { error } = await supabase
      .from('user_progress')
      .upsert(
        {
          user_id: user.id,
          book_id: bookId,
          chapter_id: chapterId,
          completed: completed || false,
          last_accessed_at: new Date().toISOString(),
          ...(completed && { completed_at: new Date().toISOString() }),
        },
        {
          onConflict: 'user_id,chapter_id',
        }
      );

    if (error) {
      console.error('Progress tracking error:', error);
      return NextResponse.json(
        { error: 'Failed to track progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Track progress error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to track progress' },
      { status: 500 }
    );
  }
}
