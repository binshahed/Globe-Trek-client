import TabContent from "@/src/components/features/profile/TabContent";
import UpdateUserProfile from "@/src/components/modals/UpdateUserProfile";
import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config";
import { getMyBlog } from "@/src/service/blogs";

import { User } from "@nextui-org/user";

import React from "react";

const Profile = async () => {
  const blogData = await getMyBlog();

  return (
    <Container>
      <div
        className="bg-cover bg-center h-[200px] rounded"
        style={{
          backgroundImage: 'url("/travelFeatures.jpg")' // Replace with your image URL
        }}
      ></div>
      <div className="flex">
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            className: "w-[150px] h-[150px]"
          }}
          className="transition-transform mt-[-100px] ml-[30px]"
          description=""
          name=""
        />
        <div className="ml-8 mt-5">
          <h5 className="text-3xl font-bold">Shahed Ahmed</h5>
          <p className="text-sm ">5k Followers</p>
        </div>
      </div>
      <div>
        <TabContent blog={blogData} />
      </div>
    </Container>
  );
};

export default Profile;
