import TabContent from "@/src/components/features/profile/TabContent";
import Container from "@/src/components/UI/Container";

import ProfileSection from "./sections/ProfileSection";

const Profile = () => {
  return (
    <Container>
      <div
        className="bg-cover bg-center h-[200px] rounded"
        style={{
          backgroundImage: 'url("/travelFeatures.jpg")' // Replace with your image URL
        }}
      ></div>
      <ProfileSection />
      <div>
        <TabContent />
      </div>
    </Container>
  );
};

export default Profile;
