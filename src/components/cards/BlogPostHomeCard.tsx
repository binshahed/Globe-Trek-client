import React, { useEffect, useState } from "react";
import { Card, CardBody, Image, Button, Avatar, Chip } from "@nextui-org/react";
import Link from "next/link";
import moment from "moment";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useAppSelector } from "@/src/store/hooks";
import { useFollowToggleMutation } from "@/src/store/features/user/userApi";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

export default function BlogPostHomeCard({ blog }: { blog: any }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followToggle] = useFollowToggleMutation();
  const user = useAppSelector(useCurrentUser);

  useEffect(() => {
    setIsFollowed(blog?.author?.followers.includes(user?.data?._id));
  }, [user, blog?.author?._id]);

  const handleFollowToggle = async () => {
    try {
      setIsFollowed(!isFollowed);
      await followToggle({
        userId: blog?.author?._id
      });
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <Card
      isBlurred
      className="border-none bg-background/60 dark:bg-default-100/50 max-w-full"
      shadow="sm"
    >
      <CardBody>
        <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
          <div className="relative col-span-6 md:col-span-4">
            <Image
              alt="Album cover"
              className="object-cover"
              height={200}
              shadow="md"
              src={blog?.featuredImage}
              width="100%"
            />
          </div>

          <div className="flex flex-col col-span-6 md:col-span-8">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={blog?.author?.photoUrl}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className=" font-semibold leading-none text-default-600">
                  <span className="mr-5 text-md"> {blog?.author?.name}</span>
                  {user && user?.data?._id !== blog?.author?._id && (
                    <Button
                      className={
                        isFollowed
                          ? "bg-transparent text-foreground border-default-200"
                          : ""
                      }
                      color="primary"
                      radius="full"
                      size="sm"
                      variant="bordered"
                      onClick={handleFollowToggle}
                    >
                      {isFollowed ? "Unfollow" : "Follow"}
                    </Button>
                  )}
                </h4>
                <h5 className="text-small tracking-tight text-default-400 flex">
                  {moment(blog?.createdAt).calendar()} {"  "} *{"  "}
                  <span>{blog?.category?.name}</span> {"  "} *{"  "}
                  <span className="mx-3">
                    {blog?.subsCription === "free" ? (
                      <Chip color="primary">{blog?.subsCription}</Chip>
                    ) : (
                      <Chip color="danger">{blog?.subsCription}</Chip>
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
            </div>

            <Link
              href={`/blog/${blog?._id}`}
              className="text-2xl dark:hover:text-gray-300 hover:text-gray-500 font-bold dark:text-white "
            >
              {blog?.title}
            </Link>
            <h6 className="text-md  dark:text-gray-200">{blog?.slug}</h6>
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    blog.content.length > 200
                      ? blog.content.slice(0, 200) + "..."
                      : blog.content
                }}
              />
              {blog.content.length > 200 && (
                <Link
                  className="text-blue-400 mt-3"
                  href={`/blog/${blog?._id}`}
                >
                  Read Full
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
