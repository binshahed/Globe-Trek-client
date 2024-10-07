/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  useDisclosure
} from "@nextui-org/react"; // Using NextUI for modal

import dynamic from "next/dynamic";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // Import styles
import envConfig from "@/src/config";
import { useSelector } from "react-redux";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner"; // Import Sonner

import GlobeForm from "../form/GlobeForm";
import GlobeInput from "../form/GlobeInput";

import { createBlog } from "@/src/service/blogs";
import { useGetCategoryQuery } from "@/src/store/features/category/categoryApi";
import GlobeSelect from "../form/GlobeSelect";
import { IoIosCreate } from "react-icons/io";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

const MyReactQuill = ReactQuill as any;

const CreateBlogModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const user = useSelector(useCurrentUser);

  const {
    data: categoryData,
    isLoading,
    isSuccess
  } = useGetCategoryQuery(undefined);

  const [title, setTitle] = useState(""); // Title state
  const [slug, setSlug] = useState(""); // Slug state
  const [content, setContent] = useState(""); // For Rich Text Editor content
  const [imageFile, setImageFile] = useState<File | null>(null); // File for uploading
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview URL
  const [loading, setLoading] = useState(false); // For loading state
  const [category, setCategory] = useState(""); // Category state
  const [subscription, setSubscription] = useState("free"); // Subscription state

  // Generate image preview when an image is selected
  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);

      // Cleanup the URL object when the component unmounts or file changes
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  // Handle image upload to ImgBB
  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${envConfig.image_bb}`, // Replace with your ImgBB API key
        formData
      );
      const url = response.data.data.url;
      return url; // Return the image URL
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed. Please try again."); // Sonner error message
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true); // Set loading state

    try {
      // 1. Upload the image
      const uploadedImageUrl = await uploadImage();

      if (!uploadedImageUrl) {
        throw new Error("Image upload failed");
      }

      // 2. Prepare the post data
      const postData = {
        title,
        slug,
        content,
        category, // Include category
        subscription, // Include subscription type
        author: user?.data?._id,
        featuredImage: uploadedImageUrl // Set uploaded image URL
      };

      console.log(postData);

      // 3. Submit the blog data to the backend
      const response = await createBlog(postData);

      if (!response) throw new Error("Failed to create post");

      // 4. Success feedback via Sonner
      toast.success("Post created successfully!");

      // 5. Clear all the form fields
      setTitle("");
      setSlug("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setCategory("");
      setSubscription("free");

      window.location.reload();
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Failed to create post. Please try again."); // Sonner error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  let categoryOptions = [];

  if (!isLoading && isSuccess) {
    categoryOptions = categoryData?.data?.map((c: any) => ({
      label: c.name,
      value: c._id
    }));
  }

  return (
    <>
      <Button
        className="w-full h-20 text-xl"
        variant="bordered"
        onPress={onOpen}
        color="success"
        endContent={<IoIosCreate />}
      >
        Create Blog
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Blog
              </ModalHeader>
              <ModalBody>
                <GlobeForm onSubmit={handleSubmit}>
                  <GlobeInput
                    name="title"
                    label="Title"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    required
                  />
                  <br />
                  <GlobeInput
                    name="slug"
                    label="Slug"
                    value={slug}
                    onChange={(e: any) => setSlug(e.target.value)}
                    required
                  />
                  <br />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Dropdown */}
                    <GlobeSelect
                      name="category"
                      options={categoryOptions}
                      label="Select Category"
                      loading={isLoading}
                      onChange={(e: any) => setCategory(e?.target?.value)} // Handle category selection
                    />

                    {/* Subscription Dropdown */}
                    <GlobeSelect
                      name="subscription"
                      options={[
                        {
                          label: "Free",
                          value: "free"
                        },
                        {
                          label: "Premium",
                          value: "premium"
                        }
                      ]}
                      label="Select Subscription"
                      onChange={(e: any) => setSubscription(e?.target?.value)} // Handle subscription selection
                    />
                  </div>
                  <br />

                  <MyReactQuill value={content || ""} onChange={setContent} />
                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <br />
                  {imagePreview && (
                    <div>
                      <img src={imagePreview} alt="Preview" width="200" />
                    </div>
                  )}
                  {/* Loading indicator during image upload */}
                  {loading && <p>Uploading...</p>}

                  <div className="mt-10">
                    <Button
                      type="submit"
                      disabled={loading}
                      isLoading={loading}
                    >
                      Submit
                    </Button>
                  </div>
                </GlobeForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
