import { TUser } from "@/src/types/TUser";
import { Avatar } from "@nextui-org/avatar";

import React from "react";
import ConnectAccordion from "./ConnectAccordion";
import Follow from "../follow/Follow";

const AuthorInfo = ({ user }: { user: TUser }) => {
  return (
    <div className="md:px-[10%]">
      <Avatar
        src={user?.photoUrl}
        className="w-20 h-20 text-large mx-auto block"
      />
      <h5 className="text-lg font-bold text-center my-2">{user?.name}</h5>

      <Follow author={user} />

      <p className="text-sm text-default-500 text-center">{user?.about}</p>
      <ConnectAccordion user={user} />
    </div>
  );
};

export default AuthorInfo;
