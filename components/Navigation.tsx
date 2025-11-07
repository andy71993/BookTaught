'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { signOut } from '@/lib/auth';

interface UserState {
  email: string;
  isPaidMember: boolean;
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserState | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    loadUser();
  }, [pathname]);

  async function loadUser() {
    try {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser({
          email: currentUser.email,
          isPaidMember: currentUser.isPaidMember,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      setUser(null);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold text-gray-900">BookTaught</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-sm font-medium ${
                pathname === '/'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Library
            </Link>

            {!loading && user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium ${
                    pathname === '/dashboard'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Books
                </Link>

                {!user.isPaidMember && (
                  <Link
                    href="/upgrade"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:from-yellow-600 hover:to-orange-600 animate-pulse"
                  >
                    ✨ Upgrade
                  </Link>
                )}

                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden lg:block">
                      {user.isPaidMember && (
                        <span className="text-xs text-yellow-600 font-bold">
                          👑 Founding Member
                        </span>
                      )}
                    </span>
                  </button>

                  {showMenu && (
                    <>
                      {/* Backdrop for mobile */}
                      <div
                        className="fixed inset-0 z-40 md:hidden"
                        onClick={() => setShowMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {user.isPaidMember
                              ? '👑 Founding Member'
                              : 'Free Account'}
                          </p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowMenu(false)}
                        >
                          Dashboard
                        </Link>
                        {!user.isPaidMember && (
                          <Link
                            href="/upgrade"
                            className="block px-4 py-2 text-sm text-yellow-600 font-semibold hover:bg-gray-100"
                            onClick={() => setShowMenu(false)}
                          >
                            ✨ Upgrade to Founding Member
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            handleSignOut();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              !loading && (
                <>
                  <Link
                    href="/auth/login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {showMenu ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`px-4 py-2 text-sm font-medium ${
                  pathname === '/'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-lg`}
                onClick={() => setShowMenu(false)}
              >
                Library
              </Link>

              {!loading && user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`px-4 py-2 text-sm font-medium ${
                      pathname === '/dashboard'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    } rounded-lg`}
                    onClick={() => setShowMenu(false)}
                  >
                    My Books
                  </Link>

                  <div className="px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {user.isPaidMember ? '👑 Founding Member' : 'Free Account'}
                    </p>
                  </div>

                  {!user.isPaidMember && (
                    <Link
                      href="/upgrade"
                      className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:from-yellow-600 hover:to-orange-600 text-center"
                      onClick={() => setShowMenu(false)}
                    >
                      ✨ Upgrade to Founding Member
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      handleSignOut();
                    }}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                !loading && (
                  <>
                    <Link
                      href="/auth/login"
                      className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg"
                      onClick={() => setShowMenu(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-center"
                      onClick={() => setShowMenu(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
