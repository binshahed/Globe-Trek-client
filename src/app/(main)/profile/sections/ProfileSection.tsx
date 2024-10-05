"use client";

import UserIcon from "@/src/components/UI/UserIcon";
import { useUserQuery } from "@/src/store/features/user/userApi";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const ProfileSection = () => {
  const { data, isLoading } = useUserQuery(undefined);

  const user = data?.data;
  return (
    <div className="flex">
      <UserIcon user={user} />
      <div className="ml-8 mt-5">
        <h5 className="text-3xl font-bold flex">
          {user?.name}{" "}
          {user?.subscriptions === "premium" && (
            <RiVerifiedBadgeFill className="text-blue-500 ml-2" />
          )}
        </h5>
        {user?.email}
        <p className="text-sm "></p>
      </div>
    </div>
  );
};

export default ProfileSection;
