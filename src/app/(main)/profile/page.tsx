"use server";

import TabContent from "@/src/components/features/profile/TabContent";
import Container from "@/src/components/UI/Container";
import UserIcon from "@/src/components/UI/UserIcon";
import { getMyBlog } from "@/src/service/blogs";

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
        <UserIcon />
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
