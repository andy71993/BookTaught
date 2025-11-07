'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getCurrentUser } from '@/lib/auth';
import Paywall from '@/components/Paywall';

interface ChapterPageClientProps {
  bookSlug: string;
  bookTitle: string;
  bookId: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterSlug: string;
  chapterId: string;
  isFree: boolean;
  content: string;
  totalChapters: number;
}

export default function ChapterPageClient({
  bookSlug,
  bookTitle,
  bookId,
  chapterNumber,
  chapterTitle,
  chapterSlug,
  chapterId,
  isFree,
  content,
  totalChapters,
}: ChapterPageClientProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    async function loadUserAndTrackProgress() {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
          // Track that user accessed this chapter
          await fetch('/api/track-progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookId,
              chapterId,
              completed: false,
            }),
          });
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserAndTrackProgress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleMarkComplete() {
    if (!user) return;

    try {
      const response = await fetch('/api/track-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookId,
          chapterId,
          completed: true,
        }),
      });

      if (response.ok) {
        setCompleted(true);
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  }

  // Check if user has access
  const hasAccess = isFree || user?.isPaidMember;

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show paywall if no access
  if (!hasAccess) {
    return <Paywall />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href={`/books/${bookSlug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            ← Back to {bookTitle}
          </Link>
        </div>

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <header className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-sm font-medium text-gray-500">
                Chapter {chapterNumber}
              </span>
              {isFree && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                  FREE
                </span>
              )}
              {completed && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                  ✓ COMPLETED
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {chapterTitle}
            </h1>
            <p className="text-gray-600">
              from <span className="font-semibold">{bookTitle}</span>
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200">
            {user && !completed && (
              <div className="mb-6">
                <button
                  onClick={handleMarkComplete}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  ✓ Mark as Complete
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={`/books/${bookSlug}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                ← Back to Chapters
              </Link>

              {chapterNumber < totalChapters && (
                <Link
                  href={`/books/${bookSlug}/chapter-${chapterNumber + 1}`}
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
