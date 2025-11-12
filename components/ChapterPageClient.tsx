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
  const [markingComplete, setMarkingComplete] = useState(false);

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
    if (!user || markingComplete) return;

    setMarkingComplete(true);

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
        // Show success feedback
        setTimeout(() => setMarkingComplete(false), 1000);
      } else {
        const data = await response.json();
        console.error('Failed to mark complete:', data.error);
        alert('Failed to mark complete. Please try again.');
        setMarkingComplete(false);
      }
    } catch (error) {
      console.error('Error marking complete:', error);
      alert('Failed to mark complete. Please try again.');
      setMarkingComplete(false);
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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 max-w-4xl">
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <Link
            href={`/books/${bookSlug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm sm:text-base touch-manipulation"
          >
            ← Back to {bookTitle}
          </Link>
        </div>

        {/* Main article */}
        <article className="bg-white rounded-lg sm:rounded-xl shadow-lg p-5 sm:p-8 md:p-12 overflow-hidden">
          {/* Header */}
          <header className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-xs sm:text-sm font-medium text-gray-500">
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight break-words">
              {chapterTitle}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 break-words">
              from <span className="font-semibold">{bookTitle}</span>
            </p>
          </header>

          {/* Content - optimized for mobile reading */}
          <div className="prose prose-sm sm:prose-base md:prose-lg w-full min-w-0">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            {/* Mark complete button */}
            {user && !completed && (
              <div className="mb-6">
                <button
                  onClick={handleMarkComplete}
                  disabled={markingComplete}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                >
                  {markingComplete ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>✓</span>
                      <span>Mark as Complete</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Completed message */}
            {completed && (
              <div className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm sm:text-base text-green-700 font-medium">
                  🎉 Chapter completed! Great work!
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <Link
                href={`/books/${bookSlug}`}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors text-center touch-manipulation"
              >
                ← Back to Chapters
              </Link>

              {chapterNumber < totalChapters && (
                <Link
                  href={`/books/${bookSlug}/chapter-${chapterNumber + 1}`}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors text-center touch-manipulation"
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
