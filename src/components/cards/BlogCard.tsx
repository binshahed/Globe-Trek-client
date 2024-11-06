import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { AiFillDislike, AiFillLike } from "react-icons/ai";

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div
      className="relative flex flex-col my-6 bg-background/60 dark:bg-default-100/50 shadow-sm border border-default rounded-lg"
      key={blog?._id}
    >
      <div className="relative h-56 m-2.5 overflow-hidden text-default rounded-md">
        <Image
          src={blog?.featuredImage}
          alt="card-image"
          width={450}
          height={300}
        />
      </div>

      <div className="p-4">
        <Link
          href={`/blog/${blog?._id}`}
          className="text-2xl dark:hover:text-gray-300 hover:text-gray-500 font-bold dark:text-white "
        >
          {blog?.title}
        </Link>
        <div className="text-xs">
          <h5 className="text-small tracking-tight text-default-400 flex">
            {moment(blog?.createdAt).calendar()} {"  "} *{"  "}
            <span>{blog?.category?.name}</span> {"  "} *{"  "}
            <span className="mx-3">
              {blog?.subsCription === "free" ? (
                <p>{blog?.subsCription}</p>
              ) : (
                <p className="text-orange-400">{blog?.subsCription}</p>
              )}
            </span>{" "}
            {"  "} *{"  "}
            <span className="flex mx-1">
              <AiFillLike /> {blog?.likes.length}
            </span>
            *{"  "}
            <span className="flex mx-1">
              <AiFillDislike /> {blog?.dislikes?.length}
            </span>
          </h5>
        </div>
        <p className=" leading-normal font-light">{blog?.slug}</p>
      </div>
    </div>
  );
};

export default BlogCard;
