import "../index.css";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pexels from '../assets/pexels.jpg'; // Ensure you have this image in your assets folder

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert("You have been logged out successfully.");
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col">
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

          {isLoggedIn && (
            <nav className="md:flex gap-6">
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
          )}

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <button className="md:flex h-9 px-4 py-2 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="h-9 px-4 py-2 rounded-md text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="h-9 px-4 py-2 rounded-md text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Report Local Issues. <br />
                    <span className="text-emerald-500">Make Your City Better.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Civix helps citizens report and track local civic issues like potholes, broken lights, and garbage
                    collection problems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="flex h-10 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    Get Started
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
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                  <button className="flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    Learn More
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-emerald-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>Easy Reporting</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-emerald-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>Track Progress</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-emerald-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>Community Driven</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[400px] aspect-[4/3] overflow-hidden rounded-lg border shadow-xl">
                  <img
                    src={pexels}
                    alt="Civix App Interface"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-slate-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to improve your community
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Civix provides a comprehensive platform for citizens and city workers to collaborate on local issues.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
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
                    className="h-10 w-10 text-emerald-500"
                  >
                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                    <circle cx="12" cy="13" r="3" />
                  </svg>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Report Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    Easily report problems with photos, location data, and detailed descriptions.
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Photo uploads</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Map integration</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Categorized issues</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
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
                    className="h-10 w-10 text-emerald-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Track Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Follow the status of your reports from submission to resolution.
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Real-time updates</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Status notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Resolution timeline</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="flex flex-col space-y-1.5 p-6">
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
                    className="h-10 w-10 text-emerald-500"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <h3 className="text-lg font-semibold leading-none tracking-tight">Community Voting</h3>
                  <p className="text-sm text-muted-foreground">
                    Upvote issues in your area to help prioritize what matters most.
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <ul className="grid gap-2 text-sm">
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Issue upvoting</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Trending issues</span>
                    </li>
                    <li className="flex items-center gap-2">
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
                        className="h-4 w-4 text-emerald-500"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>Community feedback</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple process, powerful results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Civix makes it easy to report issues and track their resolution in just a few simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Report an Issue</h3>
                <p className="text-muted-foreground">
                  Take a photo, mark the location on the map, and add a description of the problem.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">City Review</h3>
                <p className="text-muted-foreground">
                  City workers review and prioritize issues based on severity and community votes.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Track Resolution</h3>
                <p className="text-muted-foreground">
                  Follow the progress of your report from submission to completion with real-time updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-slate-50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by communities everywhere
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what citizens and city workers are saying about Civix.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="rounded-lg border bg-white text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 fill-emerald-500 text-emerald-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg">
                      "I reported a pothole on my street and it was fixed within a week. The ability to track progress
                      kept me informed the whole time."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-slate-100 p-1">
                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                      </div>
                      <div>
                        <p className="font-semibold">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">Resident, Portland</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-white text-card-foreground shadow-sm">
                <div className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 fill-emerald-500 text-emerald-500"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-lg">
                      "As a city worker, Civix has transformed how we manage local issues. The dashboard makes it easy
                      to prioritize and track our work."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-slate-100 p-1">
                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                      </div>
                      <div>
                        <p className="font-semibold">Michael Rodriguez</p>
                        <p className="text-sm text-muted-foreground">Public Works, Austin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="download" className="py-12 md:py-24 lg:py-32 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Ready to improve your community?
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    Download the Civix app today and start making a difference in your neighborhood.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="flex h-10 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
                      className="mr-2 h-4 w-4"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                    Download for iOS
                  </button>
                  <button className="flex h-10 items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
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
                      className="mr-2 h-4 w-4"
                    >
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                    Download for Android
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-emerald-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>Free Download</span>
                  </div>
                  <div className="flex items-center gap-1">
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
                      className="h-4 w-4 text-emerald-500"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="m9 11 3 3L22 4" />
                    </svg>
                    <span>Regular Updates</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[400px]">
                  <div className="overflow-hidden rounded-lg border shadow-xl">
                    <img
                      src="https://placehold.co/400x600/png"
                      alt="Civix App on Mobile"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-lg border bg-background p-2 shadow-lg">
                    <div className="flex h-full w-full items-center justify-center rounded bg-emerald-100">
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
                        className="h-10 w-10 text-emerald-500"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-slate-50">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
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
          <nav className="flex gap-4 md:gap-6">
            <a href="#" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Features
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm font-medium hover:text-emerald-500 transition-colors">
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-emerald-500 transition-colors">
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
                className="h-5 w-5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
        <div className="container py-4 md:py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Civix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}


export default Home
