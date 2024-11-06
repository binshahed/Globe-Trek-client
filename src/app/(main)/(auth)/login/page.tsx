"use client"; // Ensure this component is a Client Component

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner";
import GlobeForm from "@/src/components/form/GlobeForm";
import GlobeInput from "@/src/components/form/GlobeInput";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { loginValidationSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/src/service/authService";
import ForgotPasswordModal from "@/src/components/modals/ForgotPasswordModal";
import Link from "next/link";
import { verifyToken } from "@/src/utils/verifyToken";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToReferrer = searchParams.get("redirect") || "/"; // Default redirect to home
  const [clickUser, setClickUser] = useState({
    email: "",
    password: ""
  });

  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  // Handle the submit logic
  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await loginUser(data); // Call loginUser service

      if (res.success) {
        const decodedToken = await verifyToken(res.data.accessToken); // Ensure verifyToken is defined

        dispatch(setUser({ user: decodedToken, token: res.data.accessToken }));

        toast.success("Login successful");

        // Redirect after successful login
        router.push(redirectToReferrer);
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred during login");
    } finally {
      setLoading(false); // Set loading to false when login is complete
    }
  };

  // Set email and password when clicking "Admin" or "User" buttons
  const handleUserClick = (userType: "admin" | "user") => {
    if (userType === "admin") {
      setClickUser({
        email: "mdbinshahed3@gmail.com",
        password: "123456"
      });
    } else {
      setClickUser({
        email: "mdbinshahed5@gmail.com",
        password: "123456"
      });
    }
  };

  return (
    <>
      {isLoading && (
        <div className="h-screen bg-black/10 inset-0 z-[999] fixed backdrop-blur-sm flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      )}
      <div className="h-[calc(100vh-88px)] flex w-full justify-center items-center">
        <div className="w-full md:w-3/6 lg:w-3/6 dark:bg-gray-900 bg-gray-100 p-10 rounded-[10px] shadow-lg">
          <h1 className="mx-auto text-4xl font-semibold text-center text-default-900">
            Welcome Back!
          </h1>
          <p className="text-lg text-center text-default-900 mb-6">
            Please log in to continue.
          </p>

          {/* Admin/User buttons */}
          <div className="flex items-center justify-center mb-6">
            <Button className="mr-5" onClick={() => handleUserClick("admin")}>
              Admin
            </Button>
            <Button onClick={() => handleUserClick("user")}>User</Button>
          </div>

          {/* Form */}
          <GlobeForm
            onSubmit={handleSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <GlobeInput
              className="my-4"
              label="Email"
              name="email"
              type="email"
              value={clickUser.email} // Use value instead of defaultValue
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClickUser({ ...clickUser, email: e.target.value })
              }
              errorMessage="Please enter your email address"
            />
            <GlobeInput
              className="my-4"
              label="Password"
              name="password"
              type="password"
              value={clickUser.password} // Use value instead of defaultValue
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setClickUser({ ...clickUser, password: e.target.value })
              }
              errorMessage="Please enter your password"
            />
            <div className="flex justify-between">
              <ForgotPasswordModal />
              <p className="text-right">
                Don’t have an account?{" "}
                <Link href="/register" className="text-blue-500">
                  Register
                </Link>
              </p>
            </div>
            <Button
              variant="solid"
              className="w-full my-4"
              type="submit"
              isLoading={isLoading}
              disabled={isLoading} // Disable button during loading
            >
              Login
            </Button>
          </GlobeForm>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
