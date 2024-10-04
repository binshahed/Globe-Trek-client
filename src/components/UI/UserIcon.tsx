"use client";


import { User } from "@nextui-org/user";

const UserIcon = ({ user }: { user: any }) => {
  console.log("user photo", user?.imageUrl);
  return (
    <User
      as="button"
      avatarProps={{
        isBordered: true,
        src: `${user?.photoUrl}`,
        className: "w-[150px] h-[150px]"
      }}
      className="transition-transform mt-[-100px] ml-[30px]"
      description=""
      name=""
    />
  );
};

export default UserIcon;
