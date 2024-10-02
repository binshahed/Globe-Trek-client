import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useFollowToggleMutation } from "@/src/store/features/user/userApi";
import { useAppSelector } from "@/src/store/hooks";
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";

import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import UpdateBlogModal from "../modals/UpdateBlogModal";
import { useDeleteBlogMutation } from "@/src/store/features/blog/blogApi";
import { toast } from "sonner";
import { TError } from "@/src/types/global.Type";
import { MdDelete } from "react-icons/md";

export default function BlogProfileCard({ blog }: { blog: any }) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followToggle] = useFollowToggleMutation();

  const [deleteBlog, { isLoading, isSuccess, isError, error }] =
    useDeleteBlogMutation();

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

  const handleDeleteBlog = () => {
    deleteBlog(blog?._id);
  };

  if (!isLoading && isSuccess) {
    toast.success("Blog deleted successfully");
  }
  if (!isLoading && isError) {
    toast.error((error as TError)?.data?.message);
  }

  const isOwner = user?.data?._id === blog?.author?._id;

  return (
    <Card className="my-10 py-3">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={blog?.author?.photoUrl}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {blog?.author?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {moment(blog?.createdAt).calendar()}
            </h5>
          </div>
        </div>
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
            variant={isFollowed ? "bordered" : "solid"}
            onClick={handleFollowToggle}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}
        {isOwner && (
          <div>
            <UpdateBlogModal blogData={blog} />
            <Button
              isIconOnly
              color="danger"
              aria-label="Edit Post"
              className="min-w-7 w-7 h-7 mt-2"
              onClick={handleDeleteBlog}
              isLoading={isLoading}
            >
              <MdDelete className="w-5 h-5" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
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
            <Link className="text-blue-400 mt-3" href={`/blog/${blog?._id}`}>
              Read Full
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
