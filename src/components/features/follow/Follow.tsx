"use client";

import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useFollowToggleMutation } from "@/src/store/features/user/userApi";
import { useAppSelector } from "@/src/store/hooks";
import { TUser } from "@/src/types/TUser";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";

const Follow = ({ author }: { author: TUser }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followToggle] = useFollowToggleMutation();
  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    const followersIds = author?.followers.map((f: any) => f._id);
    setIsFollowed(followersIds.includes(user?.data?._id as string));
  }, [user, author?._id]);

  const handleFollowToggle = async () => {
    try {
      setIsFollowed(!isFollowed);
      await followToggle({
        userId: author?._id
      });
    } catch (error) {
      console.error("Error following user:", error);
    }
  };
  return (
    <>
      {user && user?.data?._id !== author?._id && (
        <div className="flex items-center justify-center my-5">
          <Button
            className={
              isFollowed
                ? "bg-transparent text-foreground border-default-200 "
                : ""
            }
            color="primary"
            radius="full"
            size="sm"
            variant="bordered"
            onClick={handleFollowToggle}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        </div>
      )}
    </>
  );
};

export default Follow;
