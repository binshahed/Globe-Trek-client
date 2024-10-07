/* eslint-disable no-unused-vars */
"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure
} from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import GlobeForm from "../form/GlobeForm";
import GlobeInput from "../form/GlobeInput";
import { useState } from "react";
import { toast } from "sonner"; // Assume you're using a toast notification system
import { TUserData } from "@/src/types/TUser";
import Image from "next/image";
import { useUpdateProfileMutation } from "@/src/store/features/user/userApi";
import envConfig from "@/src/config";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  useCurrentToken,
  useCurrentUser
} from "@/src/store/features/auth/authSlice";

export default function UpdateUserProfile({ user }: { user: TUserData }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const currentUser = useSelector(useCurrentUser);

  const currentToken = useSelector(useCurrentToken);
  const [updateProfile] = useUpdateProfileMutation();
  const [imageFile, setImageFile] = useState<File | null>(null); // Store the selected image file
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.data?.photoUrl || null
  ); // Show current image or uploaded preview
  const [isSubmitting, setIsSubmitting] = useState(false); // Handle submit state

  const dispatch = useDispatch();

  const handleImageChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file)); // Show the image preview
  };

  const uploadImageToImageBB = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${envConfig.image_bb}`,
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();
      if (result.success) {
        return result.data.url; // Return the uploaded image URL
      } else {
        throw new Error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);
      let imageUrl = user?.data?.photoUrl; // Default to current image URL

      // If an image file is selected, upload it
      if (imageFile) {
        imageUrl = await uploadImageToImageBB(imageFile);
      }

      // Detect changes by comparing the form data with the initial user data
      const updatedFields: Record<string, any> = {};
      if (formData.name !== user?.data?.name)
        updatedFields.name = formData.name;
      if (formData.phone !== user?.data?.phone)
        updatedFields.phone = formData.phone;
      if (formData.address !== user?.data?.address)
        updatedFields.address = formData.address;

      // Update photoUrl only if a new image was uploaded
      if (imageFile && imageUrl !== user?.data?.photoUrl) {
        updatedFields.photoUrl = imageUrl;
      }

      if (Object.keys(updatedFields).length === 0) {
        toast.info("No changes detected");
        setIsSubmitting(false);
        return;
      }

      // Call the API to update the profile with only changed fields
      const response = await updateProfile(updatedFields).unwrap();
      if (response.success) {
        dispatch(
          setUser({
            user: { ...currentUser, data: response?.data },
            token: currentToken
          })
        );
        onClose();
        toast.success("Profile updated successfully");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error from API:", error);
      toast.error("Error submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="default"
        aria-label="Edit Profile"
        className="min-w-7 w-7 h-7 mt-2 ml-2"
      >
        <CiEdit className="w-5 h-5" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <GlobeForm onSubmit={handleSubmit}>
                  <GlobeInput
                    name="name"
                    label="Name"
                    defaultValue={user?.data?.name}
                  />
                  <br />
                  <GlobeInput
                    name="email"
                    label="Email"
                    disable
                    defaultValue={user?.data?.email}
                  />
                  <br />
                  <GlobeInput
                    name="phone"
                    label="Phone"
                    defaultValue={user?.data?.phone}
                  />
                  <br />
                  <GlobeInput
                    name="address"
                    label="Address"
                    defaultValue={user?.data?.address}
                  />

                  <div className="mb-4">
                    <label
                      htmlFor="image"
                      className="w-full h-full block rounded-xl py-2 px-3 border border-default-400 text-xs cursor-pointer"
                    >
                      Image Upload
                    </label>
                    <input
                      className="hidden"
                      id="image"
                      type="file"
                      name="image"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleImageChange(e.target.files)}
                    />
                    {imagePreview && (
                      <div className="mt-3">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={150}
                          height={150}
                          className="w-[150px] h-[150px] object-cover rounded-full"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </GlobeForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
