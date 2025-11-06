import Link from 'next/link';

export default function PaymentCanceledPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <div className="text-6xl mb-6">😔</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment Canceled
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your payment was canceled. No charges were made.
        </p>
        <p className="text-gray-600 mb-8">
          If you experienced any issues or have questions, please contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/upgrade"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Library
          </Link>
        </div>
      </div>
    </div>
  );
}
