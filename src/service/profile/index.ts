"use client";
import { axiosInstance } from "@/src/lib/axiosInstance";

export const getMe = async () => {
  try {
    const { data } = await axiosInstance.get("/auth/me");
    return await data?.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
