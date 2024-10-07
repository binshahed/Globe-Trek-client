import ChartLoading from "@/src/components/UI/ChartLoading";
import { useGetAllPaymentsQuery } from "@/src/store/features/payment/paymentApi";
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
  total: number;
};

const PaymentList = () => {
  const { data: payments, isLoading } = useGetAllPaymentsQuery(undefined);
  // Group transactions by month and sum the amounts
  console.log(payments?.data);

  const paymentData = payments?.data || [];

  const monthlyData: any = useMemo(() => {
    const data: { [key: string]: MonthlyData } = {};
    paymentData.forEach((transaction: any) => {
      const month = new Date(transaction.createdAt).toLocaleString("default", {
        month: "long",
        year: "numeric"
      });
      if (!data[month]) {
        data[month] = { month, total: 0 };
      }
      data[month].total += transaction.amount;
    });
    return Object.values(data); // Convert the data object to an array
  }, [paymentData]);

  return (
    <>
      {isLoading ? (
        <ChartLoading />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value}`} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default PaymentList;
