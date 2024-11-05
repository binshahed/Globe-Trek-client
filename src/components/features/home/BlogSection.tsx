"use client";

import { useEffect, useState, useCallback } from "react";
import BlogPostHomeCard from "../../cards/BlogPostHomeCard";
import axios from "axios";
import envConfig from "@/src/config";
import SearchSection from "./SearchSection";
import useInfiniteScroll from "react-infinite-scroll-hook";

type Blog = {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  author: { name: string; photoUrl: string };
  createdAt: string;
  slug: string;
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch blogs using Axios
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${envConfig.baseApi}/blog`, {
        params: { limit: 5, page } // Increased limit
      });
      const data = res.data;

      if (data?.data.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prev) => [...prev, ...data?.data]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Infinite scroll hook
  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
    disabled: loading || !hasMore
  });

  return (
    <div ref={infiniteRef}>
      <div className="text-center mb-10">
        <h5 className="text-lg italic">Latest Insights</h5>
        <h2 className="text-6xl font-semibold">Latest Blogs</h2>
      </div>
      <SearchSection />
      {blogs?.map((blog) => (
        <div className="mt-10" key={blog?._id}>
          <BlogPostHomeCard blog={blog} />
        </div>
      ))}
      {loading && <p className="text-center">Loading more blogs...</p>}
      {!hasMore && <p className="text-center">No more data found</p>}
    </div>
  );
};

export default BlogSection;
