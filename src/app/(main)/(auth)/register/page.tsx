"use client"; // Ensure this component is a Client Component

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRegisterMutation } from "@/src/store/features/auth/authApi";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { registerSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@nextui-org/input";
import { verifyToken } from "@/src/utils/verifyToken";
import { TError } from "@/src/types/global.Type";

// Define form data type based on schema
type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToReferrer = searchParams.get("redirect") || "/";

  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
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
  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const res = await register(data).unwrap();
      const user = await verifyToken(res.data.accessToken); // Ensure verifyToken is defined
      dispatch(setUser({ user, token: res.data.accessToken }));
    } catch (err) {
      toast.error("register failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as TError)?.data?.message);
    }

    if (isSuccess) {
      toast.success("register successful");
      // window.location.reload();
      router.push("/");
    }
  }, [isError, isSuccess, router, redirectToReferrer, error]);

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
