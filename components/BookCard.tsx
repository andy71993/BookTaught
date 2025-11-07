'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookMetadata } from '@/lib/books';
import { useState } from 'react';

interface BookCardProps {
  book: BookMetadata;
}

export default function BookCard({ book }: BookCardProps) {
  const isComingSoon = !book.published;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center overflow-hidden">
        {isComingSoon && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full z-10">
            Coming Soon
          </div>
        )}

        {!imageError && book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={`${book.title} cover`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="text-6xl mb-4">📖</div>
            <div className="text-lg font-bold text-gray-700 px-4">
              {book.title}
            </div>
          </div>
        )}
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
            className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors touch-manipulation"
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
