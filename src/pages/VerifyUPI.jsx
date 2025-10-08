import { useState } from "react";
import api from "../lib/api";

export default function VerifyUPI() {
  const [upiId, setUpiId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!upiId) return setError("Please enter a UPI ID.");
    setError("");
    setResult(null);

    try {
      const res = await api.get(`/verifyUPI/${upiId}`);
      setResult(res.data);
    } catch (err) {
      setError("Server error while verifying UPI.");
    }
  };

  return (
    <div className="flex flex-col items-center py-20 text-gray-800">
      <h2 className="text-3xl font-semibold text-blue-600 mb-6">
        Verify UPI for Potential Fraud
      </h2>

      {/* Input field */}
      <input
        type="text"
        placeholder="Enter UPI ID"
        className="border p-2 rounded w-80 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />

      {/* Verify button */}
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Verify
      </button>

      {/* Error message */}
      {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* Verification result */}
      {result && (
        <div className="mt-8 w-96 bg-white border border-gray-200 shadow rounded-lg p-6 text-center">
          {result.status === "⚠️ Reported as Fraudulent" ? (
            <>
              <p className="text-red-600 font-semibold text-lg mb-3">
                ⚠️ Reported as Fraudulent
              </p>

              {/* Display behaviors if available */}
              {result.behaviors && result.behaviors.length > 0 ? (
                <ul className="text-gray-700 text-sm mb-2 text-left list-disc list-inside">
                  {result.behaviors.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No specific behavior details provided.
                </p>
              )}

              <p className="text-gray-600 text-sm italic mt-2">
                {result.description}
              </p>
            </>
          ) : (
            <p className="text-green-600 font-medium text-lg">
              {result.status}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
