'use client'

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle"

export function Header() {
  const { isSignedIn, user } = useUser();

  return (
    <header className="container mx-auto px-4 py-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Movie Recommender</h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.firstName}!</span>
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </header>
  )
}

