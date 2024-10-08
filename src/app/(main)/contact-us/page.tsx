import Container from "@/src/components/UI/Container";
import Link from "next/link";

const ContactUs = () => {
  return (
    <Container className="py-12">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information Section */}
        <div className="bg-default-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-2">
            We love to hear from you! Whether you have a question, feedback, or
            just want to share your travel stories, feel free to reach out to
            us.
          </p>
          <p className="mb-2">
            Email:{" "}
            <a href="mailto:info@globetrek.com" className="text-blue-500">
              info@globetrek.com
            </a>
          </p>
          <p className="mb-2">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +123 456 7890
            </a>
          </p>
          <p className="mb-2">Address: 123 Travel Lane, Adventure City</p>
          <p className="mt-4">
            Follow us on social media for the latest updates and travel
            inspiration:
          </p>
          <ul className="mt-2">
            <li>
              <Link href="#" className="text-blue-500">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-500">
                Instagram
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-500">
                Twitter
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Form Section */}
        <div className="bg-default-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <p className="mb-4">
            {"We're"} here to help! Fill out the form below, and {"we'll"} get
            back to you as soon as possible.
          </p>
          <form>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Subject"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-default-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Customer Service Commitment Section */}
      <div className="mt-12 bg-default-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment to You</h2>
        <p className="mb-4">
          At Globe Trek, we are committed to providing you with the best travel
          experience possible. Our customer service team is dedicated to
          assisting you with any inquiries or concerns you may have. We value
          your feedback and strive to continuously improve our services.
        </p>
        <p>
          If you have any suggestions on how we can serve you better, please let
          us know! Your satisfaction is our top priority.
        </p>
      </div>
    </Container>
  );
};

export default ContactUs;
