import React from 'react';
import { Link } from 'react-router-dom';
import error404 from '../assets/404.png'; // Ensure path is correct

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center">
      <img
        src={error404}
        alt="404 Not Found"
        className="w-80 md:w-[400px] mb-6"
      />
      <Link to="/">
        <h3 className="px-6 py-3 text-emerald-500 font-medium ">
          ⬅ Back to Home
        </h3>
      </Link>
    </div>
  );
};

export default NotFound;
