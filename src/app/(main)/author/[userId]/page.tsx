/* eslint-disable react/no-unescaped-entities */
import BlogPostHomeCard from "@/src/components/cards/BlogPostHomeCard";
import AuthorInfo from "@/src/components/features/profile/AuthorInfo";
import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config";
import { TUser } from "@/src/types/TUser";
import React from "react";

const AuthorProfilePage = async ({
  params
}: {
  params: { userId: string };
}) => {
  const res = await fetch(
    `${envConfig.baseApi}/auth/author/${params?.userId}`,
    {
      cache: "no-store"
    }
  );

  const data = await res.json();
  const user: TUser = data?.data;

  const blogRes = await fetch(
    `${envConfig.baseApi}/blog/author/${params?.userId}`
  );

  const blogData = await blogRes.json();

  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 my-10">
        <div className="col-span-3 md:col-span-2 order-1 ">
          {/* user info card  */}
          <div className="  hidden md:block">
            <h5 className="text-3xl font-bold flex  text-default-700 mb-10">
              {user.name}'s Blogs
            </h5>
          </div>
          {/* user info card end */}
          {blogData?.data.map((blog: any) => (
            <BlogPostHomeCard key={blog._id} blog={blog} />
          ))}

          {blogData?.data.length === 0 && (
            <p className="text-center">No Blog Found </p>
          )}
        </div>
        <div className="col-span-3 md:col-span-1 order-0 md:order-2 md:border-l-1 md:border-default-200">
          <AuthorInfo user={user} />
        </div>
      </div>
    </Container>
  );
};

export default AuthorProfilePage;
