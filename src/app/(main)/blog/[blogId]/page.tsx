import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { Button } from "@nextui-org/button";
const BlogDetails = async ({ params }: { params: { blogId: string } }) => {
  const res = await fetch(`${envConfig.baseApi}/blog/${params?.blogId}`);

  const { data } = await res.json();

  console.log("blogDetail", data);

  return (
    <Container className="my-20">
      <h5 className="mt-4 text-3xl font-semibold">{data?.title}</h5>
      <h5 className="text-md ">{data?.slug}</h5>
      <div className="my-3 flex items-center">
        <h5 className="text-small tracking-tight text-default-400 flex">
          <span className="m-1">
            <MdOutlineAccessTimeFilled />
          </span>{" "}
          {moment(data?.createdAt).calendar()}
        </h5>
        <h5 className=" ml-5 flex text-small  text-default-400 ">
          <span className="m-1">
            {" "}
            <FaUserEdit />{" "}
          </span>{" "}
          {data?.author?.name}
        </h5>
        <div className="flex items-center mx-3">
          <Button
            className=" min-w-0 w-10 p-2"
            isIconOnly
            color="primary"
            aria-label="Like"
          >
            <AiFillLike className="w-10 h-10" />
          </Button>{" "}
          <span className="text-small tracking-tight text-default-400 flex px-2">
            120 Upvote{" "}
          </span>
        </div>

        <div className="flex items-center mx-3">
          <Button
            className=" min-w-0 w-10 p-2"
            isIconOnly
            color="primary"
            aria-label="Like"
          >
            <AiFillDislike className="w-10 h-10" />
          </Button>{" "}
          <span className="text-small tracking-tight text-default-400 flex px-2">
            120 Downvote
          </span>
        </div>
      </div>

      <div className="w-full h-60 sm:h-80 lg:h-96 relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={data?.featuredImage}
          alt="Featured Image"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data.content
        }}
      />
    </Container>
  );
};

export default BlogDetails;
