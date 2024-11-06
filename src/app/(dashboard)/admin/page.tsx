"use client";

import { FaBlog, FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import InfoCard from "../user/components/InfoCard ";
import BlogListGraph from "./components/BlogListGraph";
import PaymentList from "./components/PaymentGraph";
import TotalUserListGraph from "./components/TotalUserListGraph";
import { useGetUsersQuery } from "@/src/store/features/user/userApi";
import { useGetAllPaymentsQuery } from "@/src/store/features/payment/paymentApi";
import { useGetAllBlogsQuery } from "@/src/store/features/blog/blogApi";

const Dashboard = () => {
  const { data: users, isLoading } = useGetUsersQuery(undefined);
  const { data: payments, isLoading: isPaymentLoading } =
    useGetAllPaymentsQuery(undefined);

  const { data: posts, isLoading: isBlogLoading } =
    useGetAllBlogsQuery(undefined);

  const totalEarning = payments?.data?.reduce(function (prev: any, cur: any) {
    return prev + cur.amount;
  }, 0);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <InfoCard
          title="Total Posts"
          value={posts?.data?.length}
          icon={<FaBlog />}
        />
        <InfoCard
          title="Total Users"
          value={users?.data?.length}
          icon={<FaUsers />}
        />
        <InfoCard
          title="Total Earning"
          value={`${totalEarning}$`}
          icon={<FaMoneyBillTrendUp />}
        />
      </div>

      <h3 className="my-5 text-center font-bold text-md">
        Monthly Payment List
      </h3>
      <PaymentList payments={payments} isLoading={isPaymentLoading} />
      <h3 className="my-5 text-center font-bold text-md">Monthly Post List</h3>
      <BlogListGraph posts={posts} isLoading={isBlogLoading} />
      <h3 className="my-5 text-center font-bold text-md">Monthly User List</h3>
      <TotalUserListGraph users={users} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
