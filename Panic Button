// File: app/page.tsx or src/pages/PanicButton.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function PanicButton() {
  const [alertSent, setAlertSent] = useState(false);
  const [showContacts, setShowContacts] = useState(false);

  const handleSendMessage = (type) => {
    console.log(`Message sent to ${type} authorities.`);
    alert(`Message sent to ${type} authorities.`);
  };

  const handlePanicClick = () => {
    setAlertSent(true);
    setShowContacts(true);

    // Automatically notify all authorities
    handleSendMessage("Police (100)");
    handleSendMessage("Women Safety Cell (181)");
    handleSendMessage("Child Welfare (1991)");

    // Simulate delay for system feedback
    setTimeout(() => {
      alert("Emergency alert has been sent to the nearest authority.");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="p-10 rounded-2xl bg-white shadow-2xl text-center max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-red-600">Panic Button</h1>
        <p className="mb-4 text-gray-600">
          Press the button below if you're in danger or need immediate help.
        </p>
        <Button
          onClick={handlePanicClick}
          className="bg-red-600 hover:bg-red-700 text-white text-lg px-6 py-3 rounded-2xl shadow-lg"
        >
          <AlertTriangle className="inline mr-2" /> Send Emergency Alert
        </Button>

        {alertSent && (
          <p className="mt-4 text-green-600 font-semibold">
            Alert Sent Successfully!
          </p>
        )}

        {showContacts && (
          <div className="mt-6 space-y-3">
            <p className="font-medium text-gray-800">Contacting:</p>
            <div className="space-y-2">
              <Button
                onClick={() => handleSendMessage("Police (100)")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                🚓 Police - 100
              </Button>
              <Button
                onClick={() => handleSendMessage("Women Safety Cell")}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                👩‍🦰 Women Safety
              </Button>
              <Button
                onClick={() => handleSendMessage("Child Welfare")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                🧒 Child Safety
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
