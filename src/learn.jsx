import React from "react";

const Learn = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Page Intro */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-emerald-600">
            Civix helps to make your life easy
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-200">
            For any issue, read below
          </p>
        </div>

        {/* Section 1: How to submit issue */}
        <section className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-emerald-600">
            How to Submit an Issue
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>
              Click on <span className="font-semibold">Issue Type</span> and
              select the relevant category.
            </li>
            <li>
              Enter the <span className="font-semibold">Date</span> of the
              issue.
            </li>
            <li>
              Fill in the <span className="font-semibold">Description</span>{" "}
              with details about the problem.
            </li>
            <li>
              Mark the <span className="font-semibold">Location</span> on the
              map.
            </li>
            <li>
              Add <span className="font-semibold">Images</span> if available.
            </li>
            <li>
              Click on <span className="font-semibold">Submit</span>.
            </li>
            <li>Your issue will be submitted successfully!</li>
          </ol>
        </section>

        {/* Section 2: Where to see your issue */}
        <section className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-emerald-600">
            Where to See Your Issue
          </h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>
              <span className="font-semibold">If you sign in</span>, you can
              view all your issue history in your account.
            </li>
            <li>
              <span className="font-semibold">Or</span>, you can see your issue
              in the <span className="font-semibold">Recent</span> section on
              the homepage.
            </li>
          </ul>
        </section>

        {/* Section 3: How to track the issue */}
        <section className="bg-slate-50 dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-emerald-600">
            How to Track Your Issue
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-lg">
            <li>
              Click on the <span className="font-semibold">Track Issue</span>{" "}
              button.
            </li>
            <li>
              You will see the <span className="font-semibold">status</span> of
              your issue and the people working on it.
            </li>
          </ol>
        </section>

        {/* Pro Tip Section */}
        <section className="rounded-lg shadow p-6 bg-emerald-500 text-white">
          <h2 className="text-2xl font-bold mb-2">Pro Tip</h2>
          <p className="text-lg">
            <span className="font-semibold">Upvote</span> the issues that matter
            to you! More upvotes help your issue get noticed and resolved
            faster.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Learn;
