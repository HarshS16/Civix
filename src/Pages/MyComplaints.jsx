import React from "react";

const complaintsData = [
  {
    id: 1,
    complaint: "Street lights not working properly in my area.",
    status: "Pending",
    upvotes: 12,
    date: "2025-06-25",
  },
  {
    id: 2,
    complaint: "Garbage collection is irregular and causing bad smell.",
    status: "In Progress",
    upvotes: 35,
    date: "2025-06-20",
  },
  {
    id: 3,
    complaint: "Water supply is inconsistent for last 2 weeks.",
    status: "Resolved",
    upvotes: 28,
    date: "2025-06-15",
  },
];

const MyComplaints = () => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700";
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-950 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <button
        className="absolute top-20 left-4 z-20 group flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg backdrop-blur-sm"
        onClick={() => window.history.back()}
        type="button"
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-200 mb-2">My Complaints</h1>
            <p className="text-green-600 dark:text-green-300 text-lg">Track your submitted complaints and their status</p>
          </div>
        </div>

        {complaintsData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">No complaints yet</h3>
            <p className="text-green-600 dark:text-green-300">You haven't submitted any complaints yet.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {complaintsData.map(({ id, complaint, status, upvotes, date }) => (
              <div
                key={id}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-green-100 dark:border-green-700 hover:border-green-200 dark:hover:border-green-600"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2 sm:gap-0">
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{formatDate(date)}</span>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>

                <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed mb-4 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                  {complaint}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-green-100 dark:border-green-700 gap-2 sm:gap-0">
                  <div className="flex items-center gap-1 text-green-600 dark:text-green-300 hover:text-green-700 dark:hover:text-green-200 transition-colors cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{upvotes}</span>
                    <span className="text-sm text-green-500 dark:text-green-400">upvotes</span>
                  </div>
                  
                  <div className="text-xs text-green-500 dark:text-green-400 font-medium">
                    Complaint #{id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {complaintsData.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center border border-green-100 dark:border-green-700">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">{complaintsData.length}</div>
              <div className="text-sm text-green-600 dark:text-green-300">Total Complaints</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center border border-green-100 dark:border-green-700">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                {complaintsData.filter(c => c.status === "Resolved").length}
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">Resolved</div>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 text-center border border-green-100 dark:border-green-700">
              <div className="text-2xl font-bold text-green-800 dark:text-green-200">
                {complaintsData.reduce((sum, c) => sum + c.upvotes, 0)}
              </div>
              <div className="text-sm text-green-600 dark:text-green-300">Total Upvotes</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;