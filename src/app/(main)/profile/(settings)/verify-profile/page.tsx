import Container from "@/src/components/UI/Container";
import { getMe } from "@/src/service/profile";
import PaymentForm from "./paymentForm";

const VerifyProfile = async () => {
  const user = await getMe();

  //   const handleSubmit = async (event) => {
  //     // event.preventDefault();
  //     // setIsSubmitting(true);
  //     // try {
  //     //   // Handle form submission logic here
  //     //   console.log("Form submitted!");
  //     // } catch (err) {
  //     //   console.error(err);
  //     // } finally {
  //     //   setIsSubmitting(false);
  //     // }
  //   };

  //   console.log(user);

  return (
    <Container>
      <PaymentForm user={user} />
    </Container>
  );
};

export default VerifyProfile;
