"use client";

import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { User } from "@nextui-org/user";
import { useSelector } from "react-redux";

const UserIcon = () => {
  const user = useSelector(useCurrentUser);
  return (
    <User
      as="button"
      avatarProps={{
        isBordered: true,
        src: `${user?.data?.photoUrl}`,
        className: "w-[150px] h-[150px]"
      }}
      className="transition-transform mt-[-100px] ml-[30px]"
      description=""
      name=""
    />
  );
};

export default UserIcon;
