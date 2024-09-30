"use client";
import { getMe } from "@/src/service/profile";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useUserQuery } from "@/src/store/features/user/userApi";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useSelector } from "react-redux";
import UpdateUserProfile from "../../modals/UpdateUserProfile";
import CreatePost from "./CreatePost";
import { getMyBlog } from "@/src/service/blogs";
import BlogProfileCard from "../../cards/BlogProfileCard";

const TabContent = ({ blog }: { blog: any }) => {
  const { data } = useUserQuery(undefined);

  console.log("blog", blog);

  return (
    <>
      <UpdateUserProfile user={data} />
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="post" title="Posts">
          <CreatePost />
          {blog?.data.map((post: any) => (
            <BlogProfileCard key={post?._id} blog={post} />
            // <div key={post._id} className="border p-3 rounded my-2">
            //   <p>{post.title}</p>
            //   <div dangerouslySetInnerHTML={{ __html: post.content }} />
            // </div>
          ))}
        </Tab>
        <Tab key="followers" title="Followers">
          <p>Total {data?.data?.followers.length} Followers</p>
          {data &&
            data?.data?.followers?.map((follower: any) => (
              <div key={follower._id} className="border p-3 rounded my-2">
                {follower.name}
              </div>
            ))}
        </Tab>
        <Tab key="following" title="Following">
          <p>Total {data?.data?.following.length} Following</p>
          {data &&
            data?.data?.following?.map((follower: any) => (
              <div key={follower._id} className="border p-3 rounded my-2">
                {follower.name}
              </div>
            ))}
        </Tab>
      </Tabs>
    </>
  );
};

export default TabContent;
