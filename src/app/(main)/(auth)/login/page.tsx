"use client"; // Ensure this component is a Client Component

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLoginMutation } from "@/src/store/features/auth/authApi";
import { useAppDispatch } from "@/src/store/hooks";
import { setUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner";
import GlobeForm from "@/src/components/form/GlobeForm";
import GlobeInput from "@/src/components/form/GlobeInput";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { loginValidationSchema } from "@/src/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyToken } from "@/src/utils/verifyToken";
import { TError } from "@/src/types/global.Type";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectToReferrer = searchParams.get("redirect") || "/";

  const newPath = redirectToReferrer.replace(/\+/g, "/");
  console.log("n", newPath);
  console.log("r", redirectToReferrer);

  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await login(data).unwrap();
      const user = await verifyToken(res.data.accessToken); // Ensure verifyToken is defined
      dispatch(setUser({ user, token: res.data.accessToken }));
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error((error as TError)?.data?.message);
    }

    if (isSuccess) {
      toast.success("Login successful");
      window.location.reload();
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
          <h1 className="mx-auto text-4xl font-thin">
            Hello <br /> <span className="font-bold">Welcome</span>
          </h1>
          <GlobeForm
            onSubmit={handleSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <GlobeInput
              className="my-4"
              label="Email"
              name="email"
              type="email"
              errorMessage="Please enter your email address"
            />
            <GlobeInput
              className="my-4"
              label="Password"
              name="password"
              type="password"
              errorMessage="Please enter your password"
            />
            <Button
              variant="solid"
              className="w-full my-4"
              type="submit"
              isLoading={isLoading} // Disable button during loading
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
