import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import booksData from '@/content/books/books.json';

export interface BookMetadata {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  slug: string;
  chapterCount: number;
  published: boolean;
  chapters: ChapterMetadata[];
}

export interface ChapterMetadata {
  chapterNumber: number;
  title: string;
  slug: string;
  isFree: boolean;
}

export function getAllBooks(): BookMetadata[] {
  return booksData as BookMetadata[];
}

export function getBookBySlug(slug: string): BookMetadata | undefined {
  return booksData.find((book) => book.slug === slug);
}

export function getChapterContent(bookSlug: string, chapterSlug: string): {
  content: string;
  metadata: ChapterMetadata | undefined;
  book: BookMetadata | undefined;
} {
  const book = getBookBySlug(bookSlug);
  if (!book) {
    return { content: '', metadata: undefined, book: undefined };
  }

  const chapter = book.chapters.find((ch) => ch.slug === chapterSlug);
  if (!chapter) {
    return { content: '', metadata: undefined, book };
  }

  try {
    const contentPath = path.join(
      process.cwd(),
      'content',
      'books',
      bookSlug,
      `${chapterSlug}.md`
    );
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const { content } = matter(fileContents);

    return { content, metadata: chapter, book };
  } catch (error) {
    console.error('Error reading chapter:', error);
    return { content: '', metadata: chapter, book };
  }
}
