"use client"; // Ensure this component is a Client Component

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { registerSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import { verifyToken } from "@/src/utils/verifyToken";

import { registerUser } from "@/src/service/authService";

// Define form data type based on schema
type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToReferrer = searchParams.get("redirect") || "/";

  const dispatch = useAppDispatch();
  // Set up the form using react-hook-form with zodResolver for validation
  const {
    register: registerForm,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  // Form submission handler
  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await registerUser(data); // Call loginUser service

      // If login is successful
      if (res.success) {
        // Assuming the JWT contains the user info
        console.log(res);

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

  return (
    <>
      {isLoading && (
        <div className="h-screen bg-black/10 inset-0 z-[999] fixed backdrop-blur-sm flex mx-auto justify-center">
          <Spinner size="lg" />
        </div>
      )}
      <div className="h-[calc(100vh-88px)] flex w-full justify-center items-center">
        <div className="w-full md:w-3/6 lg:w-3/6 dark:bg-gray-900 bg-gray-100 p-10 rounded-[10px] shadow-lg">
          <h1 className="mx-auto text-4xl font-thin my-3">
            Hello <span className="font-bold">Welcome</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name Input */}
            <div className="mb-4">
              <Input
                {...registerForm("name")}
                label="Name"
                variant="bordered"
                placeholder="Enter your name"
                isInvalid={!!errors.name}
                // helperText={errors.name?.message as string}
                aria-label="name"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <Input
                {...registerForm("email")}
                label="Email"
                variant="bordered"
                type="email"
                placeholder="Enter your email"
                isInvalid={!!errors.email}
                aria-label="email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <Input
                {...registerForm("password")}
                variant="bordered"
                label="Password"
                type="password"
                placeholder="Enter your password"
                isInvalid={!!errors.password}
                aria-label="password"
              />
            </div>

            {/* Phone Input */}
            <div className="mb-4">
              <Input
                {...registerForm("phone")}
                variant="bordered"
                label="Phone"
                placeholder="Enter your phone number"
                isInvalid={!!errors.phone}
                aria-label="phone"
              />
            </div>

            {/* Address Input */}
            <div className="mb-4">
              <Input
                variant="bordered"
                {...registerForm("address")}
                label="Address"
                placeholder="Enter your address"
                isInvalid={!!errors.address}
                aria-label="address"
              />
            </div>
            <p className="text-right m-1">
              Already have account?{" "}
              <Link href="/login" className="text-blue-500">
                Login
              </Link>
            </p>
            {/* Submit Button */}
            <Button
              variant="solid"
              className="w-full my-4"
              type="submit"
              isLoading={isLoading} // Disable button during loading
              disabled={isLoading} // Disable button during loading
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
