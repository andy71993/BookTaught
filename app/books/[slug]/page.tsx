import Link from 'next/link';
import Image from 'next/image';
import { getBookBySlug } from '@/lib/books';
import { notFound } from 'next/navigation';

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = getBookBySlug(params.slug);

  if (!book || !book.published) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          ← Back to Library
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-12 relative min-h-[400px]">
              {book.coverImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                    width={300}
                    height={450}
                    className="object-contain rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-8xl mb-4">📖</div>
                  <div className="text-xl font-bold text-gray-700 px-4">
                    {book.title}
                  </div>
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {book.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
              <p className="text-gray-700 mb-6">{book.description}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{book.chapterCount} chapters</span>
                <span>•</span>
                <span className="text-green-600 font-medium">
                  1 free chapter
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Chapters</h2>

          <div className="space-y-4">
            {book.chapters.map((chapter) => (
              <Link
                key={chapter.chapterNumber}
                href={`/books/${book.slug}/${chapter.slug}`}
                className="block p-6 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        Chapter {chapter.chapterNumber}
                      </span>
                      {chapter.isFree && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                          FREE
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {chapter.title}
                    </h3>
                  </div>

                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
