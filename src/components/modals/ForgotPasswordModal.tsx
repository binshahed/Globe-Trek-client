/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useForgotPasswordMutation } from "@/src/store/features/auth/authApi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    forgotPassword({ email: email });
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success("Message has been sent in your email");
      onClose();
    }
  }, [isSuccess]);

  return (
    <>
      <p onClick={onOpen} className="cursor-pointer">
        Forgot Password?
      </p>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Forgot Password?
            </ModalHeader>
            <ModalBody>
              <Input
                name="email"
                type="email"
                label="enter your email"
                onChange={(e) => setEmail(e.target?.value)}
              />
              <br />
              <Button
                isLoading={isLoading}
                type="submit"
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
