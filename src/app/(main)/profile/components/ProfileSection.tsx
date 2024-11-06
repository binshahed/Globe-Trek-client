"use client";

import UpdateUserProfile from "@/src/components/modals/UpdateUserProfile";
import UserIcon from "@/src/components/UI/UserIcon";
import { useUserQuery } from "@/src/store/features/user/userApi";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ProfileSection = () => {
  const { data, isLoading } = useUserQuery(undefined);

  const user = data?.data;
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="md:flex">
          <UserIcon user={user} />
          <div className="ml-8 mt-5">
            <h5 className="text-3xl font-bold flex">
              {user?.name}{" "}
              {user?.subscriptions === "premium" && (
                <RiVerifiedBadgeFill className="text-blue-500 ml-2" />
              )}
            </h5>
            {user?.email}
            <UpdateUserProfile user={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSection;
