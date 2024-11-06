/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Container from "../../UI/Container";
import Link from "next/link";

const HowGetStart = () => {
  return (
    <div className="h-full md:py-14 bg-cover bg-[url('/how-get-start.jpg')] ">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="text-center mt-5 md:mt-28 mb-14">
            <h2 className="text-6xl font-semibold text-white">
              How to get started with
            </h2>
            <div className="flex justify-center items-center mt-10">
              <Link href="/blog">
                <button
                  className=" border text-white font-bold text-2xl py-2 px-4 rounded flex
             hover:bg-black hover:border-0 transition ease-in-out duration-300 transform hover:scale-105"
                >
                  Read More
                </button>
              </Link>
            </div>
          </div>
          <div>
            <div className="relative flex flex-col my-6 bg-[#fffffff5] shadow-sm border border-slate-200 rounded-lg w-full">
              <div className="p-4">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  Best Places for Female Travelers
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                  Barcelona offers safe and vibrant spots for female travelers,
                  from the relaxing Barceloneta Beach to lively neighborhoods
                  like El Born, all easily accessible by public transport.
                </p>
              </div>
              <br />
              <div className="p-4">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  How to Become a Confident Solo Traveler
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                  Start by exploring safe destinations, staying aware, and
                  trusting your instincts. Barcelona is perfect for solo
                  travelers, with plenty to discover at your own pace.
                </p>
              </div>
              <br />
              <div className="p-4">
                <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                  How to Make Friends While Traveling Solo
                </h5>
                <p className="text-slate-600 leading-normal font-light">
                  Join group tours, visit cafes, or stay in hostels to meet
                  fellow travelers. Barcelona's social scene makes it easy to
                  connect with new people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HowGetStart;
