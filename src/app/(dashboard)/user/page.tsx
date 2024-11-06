"use client";

import { useMyBlogQuery } from "@/src/store/features/blog/blogApi";
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
import ChartLoading from "@/src/components/UI/ChartLoading"; // Import your loading component
import InfoCard from "./components/InfoCard ";
import { FaBlog, FaChartLine, FaUsers } from "react-icons/fa";
import { useUserQuery } from "@/src/store/features/user/userApi";

type MonthlyData = {
  month: string;
  count: number;
};

const UserDashboard = () => {
  const { data: blogData, isLoading } = useMyBlogQuery(undefined);
  const { data } = useUserQuery(undefined);
  const postData = blogData?.data || [];

  // Process data to group posts by month and count them
  const monthlyData: MonthlyData[] = useMemo(() => {
    const data: { [key: string]: MonthlyData } = {};
    postData.forEach((post: any) => {
      const month = new Date(post.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric"
      });
      if (!data[month]) {
        data[month] = { month, count: 0 };
      }
      data[month].count += 1;
    });
    return Object.values(data);
  }, [postData]);

  const myData = data?.data;

  const totalLIke = postData.map((d: any) => d.likes).flat().length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <InfoCard
          title="Total Posts"
          value={postData?.length}
          icon={<FaBlog />}
        />
        <InfoCard
          title="Followers"
          value={myData?.followers?.length}
          icon={<FaUsers />}
        />
        <InfoCard
          title="Total Likes"
          value={totalLIke}
          icon={<FaChartLine />}
        />
      </div>
      <div className="mt-10">
        <h4 className="text-lg text-center font-semibold mb-4">
          Monthly Blog Posts
        </h4>
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
      </div>
    </div>
  );
};

export default UserDashboard;
