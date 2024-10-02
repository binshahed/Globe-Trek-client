"use server";
import { axiosInstance } from "@/src/lib/axiosInstance";
import { revalidateTag } from "next/cache";
// import { toast } from "sonner";

// Fetch the user's blogs
export const getMyBlog = async () => {
  try {
    const { data } = await axiosInstance.get("/blog/my-blog"); // Removed fetchOptions as axios doesn't support this
    return data;
  } catch (error: any) {
    // toast.error(error?.response?.data?.message);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch blog data"
    );
  }
};

// Create a new blog and revalidate cache
export const createBlog = async (data: any) => {
  try {
    const response = await axiosInstance.post("/blog", data, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Revalidate the cache for "blog" tag after successful creation
    revalidateTag("blog"); // Assuming "blog" is the cache tag
    return response.data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Failed to create blog post"
    );
  }
};
