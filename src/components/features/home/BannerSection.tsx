import React from "react";
import Container from "../../UI/Container";

const BannerSection = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/banner.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <Container>
          <h1 className="text-white text-center text-5xl font-black">
            TRAVEL. CAPTURE. REMEMBER.
          </h1>
          <p className="text-center text-white text-lg md:text-2xl lg:text-2xl my-8 md:px-36 font-thin">
            Join us on an incredible journey as we explore breathtaking
            destinations, uncover unique experiences, and reveal hidden gems
            from every corner of the world. <br /> <strong>Pack your bags and come along for
            the adventure of a lifetime!</strong>
          </p>
          <button className=" border  text-white font-bold text-2xl py-2 px-4 rounded flex mx-auto hover:bg-black hover:border-0 transition ease-in-out duration-300 transform hover:scale-105">
            Start Exploring
          </button>
        </Container>
      </div>

      {/* Optional Overlay for darkening the video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-5"></div>
    </div>
  );
};

export default BannerSection;
