"use client";

import {
  useFollowToggleMutation,
  useUserQuery
} from "@/src/store/features/user/userApi";
import { TError } from "@/src/types/global.Type";
import { Button } from "@nextui-org/button";
import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

const FollowPage = () => {
  const { data, isLoading, isError, error } = useUserQuery(undefined);
  const [followToggle] = useFollowToggleMutation();

  const handleFollowToggle = async (id: string) => {
    followToggle({
      userId: id
    });
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center">
        <p>Failed to load data. Please try again later.</p>
        <p>
          {(error as TError)?.data?.message || "An unknown error occurred."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="my-5 text-center font-bold text-md">
        Manage Following / Follower
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h1 className="bg-default-200 text-center rounded p-3">Following</h1>

          {data?.data?.following?.length ? (
            data.data.following.map((f: any) => (
              <div
                key={f?._id}
                className="my-4 border-b-1 flex justify-between"
              >
                <p>{f?.name}</p>
                <Button
                  color="primary"
                  radius="full"
                  size="sm"
                  variant="bordered"
                  onClick={() => handleFollowToggle(f?._id)}
                >
                  Unfollow
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center">You are not following anyone.</p>
          )}
        </div>
        <div>
          <h1 className="bg-default-200 text-center rounded p-3">Follower</h1>
          {data?.data?.followers?.length ? (
            data.data.followers.map((follower: any) => (
              <div
                key={follower?._id}
                className="my-4 border-b-1 flex justify-between"
              >
                <p>{follower?.name}</p>
              </div>
            ))
          ) : (
            <p className="text-center">You have no followers.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowPage;
