"use client";

import { useMyBlogQuery } from "@/src/store/features/blog/blogApi";

const UserDashboard = () => {
  const { data: blogData, isLoading } = useMyBlogQuery(undefined);

  return (
    <div>
      <h3 className="my-5 text-center font-bold text-md">Dashboard</h3>
    </div>
  );
};

export default UserDashboard;
