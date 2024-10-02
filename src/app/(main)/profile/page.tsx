"use server";

import TabContent from "@/src/components/features/profile/TabContent";
import Container from "@/src/components/UI/Container";
import UserIcon from "@/src/components/UI/UserIcon";
import { getUser } from "@/src/service/authService";
import { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  data: {
    name?: string;
    email: string;
    _id: string;
  };
}

const Profile = async () => {
  const res = await getUser();
  const user = res as CustomJwtPayload;

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
          <h5 className="text-3xl font-bold">{user?.data?.name}</h5>
          {user?.data?.email}
          <p className="text-sm "></p>
        </div>
      </div>
      <div>
        <TabContent />
      </div>
    </Container>
  );
};

export default Profile;
