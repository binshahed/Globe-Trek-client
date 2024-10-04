"use client";

import GlobeForm from "@/src/components/form/GlobeForm";
import GlobeInput from "@/src/components/form/GlobeInput";
import { TUser } from "@/src/types/TUser";
import { Button } from "@nextui-org/button";

const PaymentForm = ({ user }: { user: TUser }) => {
  return (
    <GlobeForm onSubmit={() => console.log("first")}>
      <GlobeInput name="name" label="Name" defaultValue={user?.name} />
      <br />
      <GlobeInput
        name="email"
        label="Email"
        disable
        defaultValue={user?.email}
      />
      <br />
      <GlobeInput name="phone" label="Phone" defaultValue={user?.phone} />
      <br />
      <GlobeInput name="address" label="Address" defaultValue={user?.address} />
      <br />
      <Button type="submit">Payment</Button>
    </GlobeForm>
  );
};

export default PaymentForm;
