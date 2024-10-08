import Container from "@/src/components/UI/Container";
import Image from "next/image";

const AboutSection = () => {
  return (
    <Container className="my-10">
      {/* Main About Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-12">
        <div className="max-w-lg">
          <h2 className="text-3xl font-extrabold sm:text-4xl">About Us</h2>
          <p className="mt-4   text-lg">
            Welcome to Globe Trek, your ultimate travel companion! We are
            passionate explorers who believe that the world is full of amazing
            experiences waiting to be discovered. Our mission is to inspire and
            guide fellow adventurers to explore the beauty and diversity of our
            planet.
          </p>
          <div className="mt-8">
            Learn more about us
            <span className="ml-2">&#8594;</span>
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1520466809213-7b9a56adcd45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="About Us Image"
            width={500}
            height={300}
            className="object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-12">
        <div className="mt-12 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Our Mission"
            width={500}
            height={300}
            className="object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
        <div className="max-w-lg">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Our Mission</h2>
          <p className="mt-4   text-lg">
            Our mission is to empower travelers to experience the world
            authentically. We aim to provide insightful travel guides and
            inspiring stories to enhance your adventures. Join us in exploring
            new horizons!
          </p>
          <div className="mt-8">
            Discover Our Mission
            <span className="ml-2">&#8594;</span>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 mb-12">
        <div className="max-w-lg">
          <h2 className="text-3xl font-extrabold sm:text-4xl">What We Offer</h2>
          <p className="mt-4   text-lg">
            We offer a wide range of resources, including personalized travel
            itineraries, tips for budget travel, and a community of fellow
            explorers. Our content is designed to help you make the most of your
            travels.
          </p>
          <div className="mt-8">
            Explore Our Resources
            <span className="ml-2">&#8594;</span>
          </div>
        </div>
        <div className="mt-12 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
            alt="What We Offer"
            width={500}
            height={300}
            className="object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
      </div>

      {/* Join Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="mt-12 md:mt-0">
          <Image
            src="https://images.unsplash.com/photo-1524841268495-3921a3fb80c3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Join Us"
            width={500}
            height={300}
            className="object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
          />
        </div>
        <div className="max-w-lg">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Join Us</h2>
          <p className="mt-4   text-lg">
            Be a part of our community of travelers! Subscribe to our newsletter
            for the latest travel tips, exclusive content, and updates on our
            adventures. Let’s explore the world together!
          </p>
          <div className="mt-8">
            Join Our Community
            <span className="ml-2">&#8594;</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutSection;
