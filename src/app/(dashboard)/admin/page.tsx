"use client";

import BlogListGraph from "./components/BlogListGraph";
import PaymentList from "./components/PaymentGraph";
import TotalUserListGraph from "./components/TotalUserListGraph";

const Dashboard = () => {
  return (
    <div>
      <h3 className="my-5 text-center font-bold text-md">
        Monthly Payment List
      </h3>
      <PaymentList />
      <h3 className="my-5 text-center font-bold text-md">Monthly Post List</h3>
      <BlogListGraph />
      <h3 className="my-5 text-center font-bold text-md">Monthly User List</h3>
      <TotalUserListGraph />
    </div>
  );
};

export default Dashboard;
