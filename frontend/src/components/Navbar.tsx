'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          E-Learning
        </Link>
        
        <div className="flex gap-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">
                Cours
              </Link>
              <button
                onClick={() => logout()}
                className="text-gray-700 hover:text-blue-600"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Connexion
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600">
                Inscription
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
