"use client";
import { getMe } from "@/src/service/profile";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useUserQuery } from "@/src/store/features/user/userApi";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { useSelector } from "react-redux";
import UpdateUserProfile from "../../modals/UpdateUserProfile";

const TabContent = ({ blog }: { blog: any }) => {
  const { data } = useUserQuery(undefined);

  console.log("user", data?.data);

  return (
    <>
      <UpdateUserProfile user={data} />
      <Tabs variant="underlined" aria-label="Tabs variants">
        <Tab key="post" title="Posts" />
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
