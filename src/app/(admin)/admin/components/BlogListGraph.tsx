import ChartLoading from "@/src/components/UI/ChartLoading";
import { useGetAllBlogsQuery } from "@/src/store/features/blog/blogApi";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

type MonthlyData = {
  month: string;
  count: number;
};

const BlogListGraph = () => {
  const { data: posts, isLoading } = useGetAllBlogsQuery(undefined);
  console.log(posts?.data);

  const postData = posts?.data || [];

  // Group posts by month and count the number of posts
  const monthlyData: any = useMemo(() => {
    const data: { [key: string]: MonthlyData } = {};
    postData.forEach((post: any) => {
      const month = new Date(post.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric"
      });
      if (!data[month]) {
        data[month] = { month, count: 0 };
      }
      data[month].count += 1; // Count the number of posts
    });
    return Object.values(data); // Convert the data object to an array
  }, [postData]);

  return (
    <>
      {isLoading ? (
        <ChartLoading />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value} posts`} />
            <Tooltip formatter={(value) => `${value} posts`} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default BlogListGraph;
