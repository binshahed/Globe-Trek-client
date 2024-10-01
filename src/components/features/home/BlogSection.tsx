"use client";

import { useEffect, useState, useRef } from "react";
import BlogPostHomeCard from "../../cards/BlogPostHomeCard";
import axios from "axios";
import envConfig from "@/src/config";

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
  const observer = useRef<IntersectionObserver | null>(null);

  // Fetch blogs using Axios
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${envConfig.baseApi}/blog`, {
        params: { limit: 5, page }
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
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const lastBlogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading || !hasMore) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(callback);
    if (lastBlogRef.current) {
      observer.current.observe(lastBlogRef.current);
    }

    return () => {
      if (lastBlogRef.current && observer.current) {
        observer.current.unobserve(lastBlogRef.current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div>
      {blogs?.map((blog, index) => {
        const isLastBlog = index === blogs.length - 1;
        return (
          <div
            className="mt-10"
            ref={isLastBlog ? lastBlogRef : null}
            key={blog?._id}
          >
            <BlogPostHomeCard blog={blog} />
          </div>
        );
      })}
      {loading && <p className="text-center">Loading more blogs...</p>}
      {!hasMore && <p className="text-center">No more data found</p>}
    </div>
  );
};

export default BlogSection;
