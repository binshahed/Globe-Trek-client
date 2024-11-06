/* eslint-disable react/no-unescaped-entities */
import React from "react";

const NewsLatter = () => {
  return (
    <div className=" py-16 px-6 font-[sans-serif]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-base text-gray-300">
          Stay updated with the latest news, trends, and special offers. Don't
          miss out on our exciting updates.
        </p>
        <div className="mt-12 flex items-center overflow-hidden bg-gray-50 rounded-md max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full bg-transparent py-3.5 px-4 text-gray-800 text-base focus:outline-none"
          />
          <button className="bg-primary hover:bg-[#a91079e2] text-white text-base tracking-wide py-3.5 px-6 hover:shadow-md hover:transition-transform transition-transform hover:scale-105 focus:outline-none">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;
