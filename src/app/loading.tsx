import { Spinner } from "@nextui-org/spinner";
import React from "react";

const loading = () => {
  return (
    <div className="h-screen bg-black/10 inset-0 z-[999] fixed backdrop-blur-sm flex mx-auto justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default loading;
