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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetPaymentDetailsQuery } from "@/src/store/features/payment/paymentApi";
import { useSelector } from "react-redux";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";

export default function PayNowModal({ blogData }: { blogData: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector(useCurrentUser);
  const { data, isLoading } = useGetPaymentDetailsQuery(undefined);
  const router = useRouter();

  useEffect(() => {
    if (!user?.data?.email && blogData?.subsCription === "premium") {
      onOpen();
    }

    if (!isLoading && blogData?.subsCription === "premium") {
      if (user?.data?.role !== "admin") {
        if (!data?.data) {
          onOpen();
        }
      }
    }
  }, [data, user?.data, isLoading]);

  const handlePayNow = () => {
    router.push("/profile/verify-profile");
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Premium Content
              </ModalHeader>
              <ModalBody>
                <h6>
                  This blog contains premium content. To access it, please
                  complete the payment process.
                </h6>
                <Button onClick={handlePayNow}>Proceed to Payment</Button>
                <Button onClick={handleBackToHome}>Return to Homepage</Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
