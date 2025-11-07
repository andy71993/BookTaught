import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Auth error in create-checkout:', authError);
      return NextResponse.json(
        { error: 'Unauthorized - please sign in' },
        { status: 401 }
      );
    }

    // Check if user is already a paid member
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_paid_member')
      .eq('id', user.id)
      .single();

    if (profile?.is_paid_member) {
      return NextResponse.json(
        { error: 'Already a paid member' },
        { status: 400 }
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      );
    }

    console.log('Creating checkout session for user:', user.email);

    const checkoutUrl = await createCheckoutSession(user.id, user.email);

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error('Create checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
