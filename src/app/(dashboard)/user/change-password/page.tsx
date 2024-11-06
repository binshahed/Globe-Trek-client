"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useChangePasswordMutation } from "@/src/store/features/auth/authApi";
import { toast } from "sonner";
import { TError } from "@/src/types/global.Type";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [changePassword, { isLoading, isSuccess, isError, error }] =
    useChangePasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({ oldPassword, newPassword });
  };

  if (!isLoading && isSuccess) toast.success("Your password has been");
  if (!isLoading && isError) toast.error((error as TError)?.data?.message);
  return (
    <div className="max-w-md mx-auto p-6 bg-default-200 rounded-lg shadow-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6">Change Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Input
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          isLoading={isLoading}
          color="primary"
          className="w-full"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
