'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Welcome, Founding Member!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your payment was successful. You now have unlimited access to all books and chapters.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-green-700">
            You&apos;ve locked in the founding member price forever. Thank you for supporting BookTaught!
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          Redirecting in 5 seconds...
        </p>
      </div>
    </div>
  );
}
