"use client";

import GlobeForm from "@/src/components/form/GlobeForm";
import GlobeInput from "@/src/components/form/GlobeInput";
import Container from "@/src/components/UI/Container";
import { Spinner } from "@nextui-org/spinner";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";

const LoginPage = () => {
  const handleSUbmit = (data: { email: string; password: string }) => {
    console.log(data);
  };
  return (
    <>
      {/* {isPending && (
        <div className="h-screen bg-black/10 inset-0 z-[999] fixed backdrop-blur-sm flex mx-auto justify-center">
          <Spinner size="lg" />
        </div>
      )} */}
      <Container>
        <div className="h-[calc(100vh-88px)] flex w-full justify-center align-middle items-center">
          <div className="w-full md:w-3/6 lg:w-3/6 dark:bg-gray-900 bg-gray-100 p-10 rounded-[10px] shadow-lg">
            <h1 className="mx-auto text-4xl font-thin">
              Hello <br /> <span className="font-bold">Welcome</span>
            </h1>
            <GlobeForm
              onSubmit={handleSUbmit}
              // resolver={zodResolver(loginValidationSchema)}
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
                // isLoading={isPending}
                variant="solid"
                className="w-full my-4"
                type="submit"
              >
                Login
              </Button>
            </GlobeForm>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
