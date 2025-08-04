import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ClerkProvider>
  </React.StrictMode>
);
