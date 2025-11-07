import Link from 'next/link';

export default function Paywall() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="text-6xl mb-6">🔒</div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upgrade to Continue Learning
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            You&apos;ve completed your free chapter! Upgrade to Founding Member to unlock all chapters from every book.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <div className="text-5xl font-bold text-gray-900 mb-2">$49</div>
            <p className="text-gray-600 font-medium">One-time payment • Lifetime access</p>
          </div>

          <div className="space-y-4 mb-8 text-left max-w-md mx-auto">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Unlimited Access</p>
                <p className="text-sm text-gray-600">All books, all chapters, forever</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Founding Member Price</p>
                <p className="text-sm text-gray-600">Lock in this price forever (will increase later)</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-semibold text-gray-900">Expert Teaching</p>
                <p className="text-sm text-gray-600">PhD-level insights for every chapter</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upgrade"
              className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Upgrade Now
            </Link>
            <Link
              href="/"
              className="px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back to Library
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Secure payment powered by Stripe
          </p>
        </div>
      </main>
    </div>
  );
}
