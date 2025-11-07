import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error:', authError);
      return NextResponse.json(
        { error: 'Unauthorized - please sign in' },
        { status: 401 }
      );
    }

    const { bookId, chapterId, completed } = await request.json();

    console.log('Tracking progress:', { userId: user.id, bookId, chapterId, completed });

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
        { error: 'Failed to track progress: ' + error.message },
        { status: 500 }
      );
    }

    console.log('Progress tracked successfully');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Track progress error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to track progress' },
      { status: 500 }
    );
  }
}
