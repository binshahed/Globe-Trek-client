import ChartLoading from "@/src/components/UI/ChartLoading";


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

const TotalUserListGraph = ({
  users,
  isLoading
}: {
  users: any;
  isLoading: boolean;
}) => {
  const userData = users?.data || [];

  // Group users by month and count the number of registrations
  const monthlyData: any = useMemo(() => {
    const data: { [key: string]: MonthlyData } = {};
    userData.forEach((user: any) => {
      const month = new Date(user.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric"
      });
      if (!data[month]) {
        data[month] = { month, count: 0 };
      }
      data[month].count += 1; // Count the number of user registrations
    });
    return Object.values(data); // Convert the data object to an array
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <ChartLoading />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value} users`} />
            <Tooltip formatter={(value) => `${value} users`} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default TotalUserListGraph;
