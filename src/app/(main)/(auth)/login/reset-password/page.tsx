"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config";
import { toast } from "sonner";
import axios from "axios";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `${envConfig?.baseApi}/auth/reset-password`,
        { newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`
          }
        }
      );

      toast.success("Password changed successfully!");

      setNewPassword(""); // Clear the input field after successful reset
    } catch (error) {
      // Display a more informative error message

      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="mx-auto w-2/4 py-20">
        <form onSubmit={handlePasswordReset}>
          <Input
            className="w-full"
            label="New Password"
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <br />
          <Button type="submit" disabled={loading} isLoading={loading}>
            Reset Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
