import Link from 'next/link';
import { BookMetadata } from '@/lib/books';

interface BookCardProps {
  book: BookMetadata;
}

export default function BookCard({ book }: BookCardProps) {
  const isComingSoon = !book.published;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        {isComingSoon && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
            Coming Soon
          </div>
        )}
        <div className="text-6xl">📖</div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">by {book.author}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {book.description}
        </p>

        {book.published && book.chapterCount > 0 && (
          <div className="mb-4 text-sm text-gray-500">
            {book.chapterCount} chapter{book.chapterCount !== 1 ? 's' : ''} available
          </div>
        )}

        {book.published ? (
          <Link
            href={`/books/${book.slug}`}
            className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Learning
          </Link>
        ) : (
          <button
            disabled
            className="w-full py-3 px-4 bg-gray-300 text-gray-500 text-center font-medium rounded-lg cursor-not-allowed"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
}
