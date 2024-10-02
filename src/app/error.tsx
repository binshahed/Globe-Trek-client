"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-default-50">
      <div className="bg-default-200 p-8 rounded-lg shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-default-700 mb-6">
          We encountered an unexpected error. Please try again or contact
          support if the issue persists.
        </p>

        <Button
          className="w-full bg-red-600 text-white hover:bg-red-700 transition duration-300"
          onClick={reset}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
