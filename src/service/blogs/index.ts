"use server";
import { axiosInstance } from "@/src/lib/axiosInstance";

export const getMyBlog = async () => {
  try {
    const { data } = await axiosInstance.get("/blog/my-blog");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message);
  }
};
