"use client";

import { Tab, Tabs } from "@nextui-org/react";

import UpdateUserProfile from "../../modals/UpdateUserProfile";
import CreatePost from "./CreatePost";

import BlogProfileCard from "../../cards/BlogProfileCard";
import { useMyBlogQuery } from "@/src/store/features/blog/blogApi";
import PostLoading from "../../UI/PoastLoading";
import { useUserQuery } from "@/src/store/features/user/userApi";
import CreateBlogModal from "../../modals/CreateBlogModal";

const TabContent = () => {
  const { data: blogData } = useMyBlogQuery(undefined);
  const { data, isLoading } = useUserQuery(undefined);

  return (
    <>
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="post" title="Posts">
          <CreateBlogModal />
          {isLoading ? (
            <PostLoading />
          ) : (
            blogData?.data?.map((post: any) => (
              <BlogProfileCard key={post?._id} blog={post} />
              // <div key={post._id} className="border p-3 rounded my-2">
              //   <p>{post.title}</p>
              //   <div dangerouslySetInnerHTML={{ __html: post.content }} />
              // </div>
            ))
          )}
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
