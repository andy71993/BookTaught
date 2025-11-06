import Link from 'next/link';
import { getChapterContent } from '@/lib/books';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChapterPage({
  params,
}: {
  params: { slug: string; chapter: string };
}) {
  const { book, metadata, content } = getChapterContent(
    params.slug,
    params.chapter
  );

  if (!book || !metadata || !content) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/books/${book.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            ← Back to {book.title}
          </Link>
        </div>

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <header className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-sm font-medium text-gray-500">
                Chapter {metadata.chapterNumber}
              </span>
              {metadata.isFree && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  FREE
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {metadata.title}
            </h1>
            <p className="text-gray-600">
              from <span className="font-semibold">{book.title}</span> by{' '}
              {book.author}
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={`/books/${book.slug}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back to Chapters
              </Link>

              {metadata.chapterNumber < book.chapterCount && (
                <Link
                  href={`/books/${book.slug}/chapter-${metadata.chapterNumber + 1}`}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Chapter →
                </Link>
              )}
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
}
