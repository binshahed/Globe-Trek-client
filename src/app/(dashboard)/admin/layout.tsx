import Container from "@/src/components/UI/Container";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container className="my-20">
      <div className="md:flex mx-auto justify-center w-full">
        {/* Sidebar */}
        <aside className="bg-default-300 h-full w-full rounded-lg md:w-64 p-6 shadow-md md:mt-20">
          <nav>
            <Link
              href="/admin"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/manage-users"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Users
            </Link>
            <Link
              href="/admin/payment-details"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Payments
            </Link>
            <Link
              href="/admin/categories"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Categories
            </Link>
            <Link
              href="/admin/change-password"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Change Password
            </Link>
            <Link
              href="/admin/verify-profile"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Make Payment
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 md:ml-4 md:p-6">{children}</section>
      </div>
    </Container>
  );
};

export default Layout;
