import React from "react";
import "./MyComplaints.css";

// Sample static complaints data with dates
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
  // Function to format date as readable string, e.g. June 25, 2025
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(undefined, options);
  };

  return (
    <div className="complaints-page">
      <button
        className="back-button"
        onClick={() => window.history.back()}
        type="button"
      >
        ← Back
      </button>

      <h1>User Complaints</h1>

      {complaintsData.length === 0 ? (
        <p className="no-complaints-message">No complaints have been submitted yet.</p>
      ) : (
        <ul className="complaints-list">
          {complaintsData.map(({ id, complaint, status, upvotes, date }) => (
            <li key={id} className="complaint-card">
              {/* Display the date instead of user */}
              <h4 className="complaint-date">{formatDate(date)}</h4>

              <p className="complaint-text">{complaint}</p>

              <div className="complaint-footer">
                <span className={`status-tag status-${status.toLowerCase().replace(" ", "-")}`}>
                  {status}
                </span>
                <span className="upvotes">▲ {upvotes}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyComplaints;