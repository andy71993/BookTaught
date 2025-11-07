import { getChapterContent } from '@/lib/books';
import { notFound } from 'next/navigation';
import ChapterPageClient from '@/components/ChapterPageClient';

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
    <ChapterPageClient
      bookSlug={book.slug}
      bookTitle={book.title}
      bookId={book.id}
      chapterNumber={metadata.chapterNumber}
      chapterTitle={metadata.title}
      chapterSlug={metadata.slug}
      chapterId={book.id + '-' + metadata.slug}
      isFree={metadata.isFree}
      content={content}
      totalChapters={book.chapterCount}
    />
  );
}
