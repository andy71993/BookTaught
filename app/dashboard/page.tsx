'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getUserProgress } from '@/lib/progress';
import booksData from '@/content/books/books.json';

interface DashboardData {
  userName: string;
  isPaidMember: boolean;
  booksInProgress: {
    bookId: string;
    bookTitle: string;
    bookSlug: string;
    progress: number;
    lastChapter: string;
    lastChapterSlug: string;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const user = await getCurrentUser();

        if (!user) {
          router.push('/auth/login');
          return;
        }

        const progress = await getUserProgress(user.id);
        const books = booksData;

        // Group progress by book
        const bookProgress = new Map<string, any[]>();
        progress.forEach((p) => {
          if (!bookProgress.has(p.bookId)) {
            bookProgress.set(p.bookId, []);
          }
          bookProgress.get(p.bookId)!.push(p);
        });

        // Calculate progress for each book
        const booksInProgress = Array.from(bookProgress.entries())
          .map(([bookId, chapters]) => {
            const book = books.find((b) => b.id === bookId);
            if (!book) return null;

            const completedCount = chapters.filter((c) => c.completed).length;
            const progressPercent = Math.round(
              (completedCount / book.chapterCount) * 100
            );

            // Get last accessed chapter
            const lastAccessed = chapters.sort(
              (a, b) =>
                new Date(b.lastAccessedAt).getTime() -
                new Date(a.lastAccessedAt).getTime()
            )[0];

            // chapterId format is "bookId-chapterSlug", extract the chapter slug
            const chapterSlugFromId = lastAccessed.chapterId.replace(
              `${bookId}-`,
              ''
            );
            const lastChapter = book.chapters.find(
              (c) => c.slug === chapterSlugFromId
            );

            return {
              bookId: book.id,
              bookTitle: book.title,
              bookSlug: book.slug,
              progress: progressPercent,
              lastChapter: lastChapter?.title || 'Unknown',
              lastChapterSlug: lastChapter?.slug || '',
            };
          })
          .filter(Boolean) as any[];

        setData({
          userName: user.email.split('@')[0],
          isPaidMember: user.isPaidMember,
          booksInProgress,
        });
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Failed to load dashboard</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {data.userName}!
          </h1>
          <p className="text-gray-600">
            {data.isPaidMember
              ? 'Founding Member - Full Access'
              : 'Free Account - 1 Chapter Per Book'}
          </p>
        </div>

        {!data.isPaidMember && (
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 md:p-8 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Upgrade to Founding Member
            </h2>
            <p className="mb-4 opacity-90">
              Get unlimited access to all books and chapters. Support the
              platform and lock in the founding member price forever.
            </p>
            <Link
              href="/upgrade"
              className="inline-block px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Upgrade Now
            </Link>
          </div>
        )}

        {data.booksInProgress.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Start Your Learning Journey
            </h2>
            <p className="text-gray-600 mb-6">
              You haven&apos;t started any books yet. Explore our library to
              begin.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Library
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Continue Learning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.booksInProgress.map((book) => (
                <div
                  key={book.bookId}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {book.bookTitle}
                    </h3>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span className="font-semibold">{book.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">
                      Last read: {book.lastChapter}
                    </p>

                    <Link
                      href={`/books/${book.bookSlug}/${book.lastChapterSlug}`}
                      className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Continue Reading
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
