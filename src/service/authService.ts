"use server";

import { cookies } from "next/headers";
import { axiosInstance } from "../lib/axiosInstance";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      // Set cookies for access and refresh tokens
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error) {
    if ((error as any).response) {
      // Return server-side error message
      throw new Error((error as any).response.data.message || "Login failed");
    } else if ((error as any).request) {
      // Network errors
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("Unexpected error occurred");
    }
  }
};

export const getUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let getDecodedToken = null;

  if (accessToken) {
    getDecodedToken = await jwtDecode(accessToken);
    console.log("decoded token", getDecodedToken?.data);

    return getDecodedToken?.data;
  }
  return getDecodedToken; // Return null if no token is found
};

export const removeCookies = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};
