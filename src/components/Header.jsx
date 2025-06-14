import React from 'react'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-emerald-500"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xl font-bold">Civix</span>
          </div>
          <nav className="flex gap-6">
            <a href="#features" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              How It Works
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Testimonials
            </a>
            <a href="#download" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Download
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="flex h-9 px-4 py-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              Log In
            </button>
            <button className="h-9 px-4 py-2 rounded-md text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600">
              Sign Up
            </button>
          </div>
        </div>
      </header>
  )
}

export default Header