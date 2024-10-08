"use client";

import { useGetAllBlogQuery } from "@/src/store/features/blog/blogApi";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const SearchSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState<any[]>([]); // State for suggestions

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(handler); // Clear the timeout on cleanup
    };
  }, [searchTerm]);

  // Fetch data with the debounced search term
  const { data } = useGetAllBlogQuery({ searchTerm: debouncedSearchTerm });

  // Update suggestions based on fetched data and the search term
  useEffect(() => {
    if (data?.data) {
      const filteredSuggestions = data.data.filter((blog: any) =>
        blog.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [data, debouncedSearchTerm]);

  return (
    <div>
      <Input
        placeholder="Search"
        className="w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
      />

      {/* Suggestions Dropdown */}
      {searchTerm && suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-2/3 bg-default border border-gray-300 rounded-md shadow-lg ">
          {suggestions.map((blog) => (
            <li
              key={blog._id}
              className="p-2  cursor-pointer hover:bg-default-300"
            >
              <Link href={`/blog/${blog?._id}`} className="flex">
                <Image
                  alt=""
                  width={100}
                  height={100}
                  src={blog?.featuredImage}
                  className="mr-3"
                />{" "}
                <div>
                  <p className="font-bold"> {blog.title}</p>
                  <p>{blog?.slug}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSection;
