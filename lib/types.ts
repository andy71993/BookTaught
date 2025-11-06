export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  slug: string;
  chapterCount: number;
  published: boolean;
}

export interface Chapter {
  id: string;
  bookId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  content: string;
  isFree: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  bookId: string;
  chapterId: string;
  completed: boolean;
  lastAccessedAt: string;
}

export interface User {
  id: string;
  email: string;
  isPaidMember: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  stripePaymentId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
