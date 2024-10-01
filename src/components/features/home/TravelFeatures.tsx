import Image from "next/image";
import Container from "../../UI/Container";

const TravelFeatures = () => {
  return (
    <Container>
      <div className="mb-20">
        <div className="text-center mt-28 mb-14">
          <h5 className="text-lg italic">About Travel Tips</h5>
          <h2 className="text-6xl font-semibold">Travel Essential Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full h-60 sm:h-80 lg:h-96 relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/travelFeatures.jpg"
              alt="Featured Image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>

          <div className="flex items-center px-10">
            <div>
              <h3 className="text-4xl font-semibold mb-5  group relative ">
                <span className="px-1 relative z-10 group-hover:text-white">
                  Moving trough: the everyday urban jungle of your city
                </span>
                <span className="absolute left-0 bottom-0 w-full h-0.5 transition-all bg-indigo-600 z-0 group-hover:h-full "></span>
              </h3>
              <p className="mb-5">
                Choose a reliable hotel or hostel that meets your criteria and
                is convenient for your travel plans. Look for amenities like
                free Wi-Fi, breakfast, and easy access to restaurants and bars.
              </p>
              <button
                className=" border dark:text-white hover:text-white font-bold text-2xl py-2 px-4 rounded flex
               hover:bg-black hover:border-0 transition ease-in-out duration-300 transform hover:scale-105"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default TravelFeatures;
