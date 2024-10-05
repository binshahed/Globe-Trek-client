import Container from "@/src/components/UI/Container";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container className="my-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-default-300 h-full rounded-lg w-64 p-6 shadow-md">
          <nav>
            <Link
              href="/profile/change-password"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Change Password
            </Link>
            <Link
              href="/profile/verify-profile"
              className="block text-default-800 hover:text-blue-500 mb-2"
            >
              Make Payment
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 ml-4 p-6">{children}</section>
      </div>
    </Container>
  );
};

export default Layout;
