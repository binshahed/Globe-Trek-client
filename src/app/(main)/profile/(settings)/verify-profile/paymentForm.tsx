"use client";
import GlobeForm from "@/src/components/form/GlobeForm";
import GlobeInput from "@/src/components/form/GlobeInput";
import {
  useGetPaymentDetailsQuery,
  useMakePaymentMutation
} from "@/src/store/features/payment/paymentApi";
import { TUser } from "@/src/types/TUser";
import { Button } from "@nextui-org/button";
import { useEffect } from "react";

const PaymentForm = ({ user }: { user: TUser }) => {
  const [makePayment, { data, isLoading }] = useMakePaymentMutation();

  const { data: paymentData } = useGetPaymentDetailsQuery(undefined);

  const handlePayment = (formData: any) => {
    makePayment(formData);
  };

  useEffect(() => {
    if (data?.data?.payment_url) {
      window.location.replace(data?.data?.payment_url);
    }
  }, [data]);

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-md dark:bg-gray-900 bg-gray-100">
      {!paymentData?.data ? (
        <div>
          <h2 className="text-2xl font-semibold text-center my-6 text-default-900">
            Payment Form
          </h2>
          <p className="text-center mb-8 text-default-800">
            Lifetime subscription for all premium features at{" "}
            <span className="text-orange-500 font-bold">$50</span>
          </p>
          <GlobeForm onSubmit={handlePayment}>
            <div className="mb-6">
              <GlobeInput
                name="name"
                label="Name"
                defaultValue={user?.name}
                disable
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <GlobeInput
                name="email"
                label="Email"
                defaultValue={user?.email}
                disable
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <GlobeInput
                name="phone"
                label="Phone"
                defaultValue={user?.phone}
                disable
                className="w-full"
              />
            </div>

            <div className="mb-6">
              <GlobeInput
                name="address"
                label="Address"
                defaultValue={user?.address}
                disable
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              color="primary"
              isLoading={isLoading}
              className="w-full"
            >
              Make Payment
            </Button>
          </GlobeForm>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-default-900">
            Payment Details
          </h2>
          <p className="text-default-800 mb-4">
            Transaction ID:{" "}
            <span className="font-bold">
              {paymentData?.data?.transactionId}
            </span>
          </p>
          <p className="text-default-800 mb-4">
            Amount:{" "}
            <span className="font-bold">${paymentData?.data?.amount}</span>
          </p>
          <p className="text-default-800 mb-4">
            Time:{" "}
            <span className="font-bold">
              {new Date(paymentData?.data?.createdAt).toLocaleString()}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
