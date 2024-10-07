import Container from "@/src/components/UI/Container";

import PaymentForm from "./paymentForm";

const VerifyProfile = async () => {
  return (
    <Container>
      <h3 className="mb-5 text-center font-bold text-md">Verify Profile</h3>
      <PaymentForm />
    </Container>
  );
};

export default VerifyProfile;
