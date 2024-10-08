import Container from "@/src/components/UI/Container";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-default-50 text-default-700 py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="mb-2">Email: info@globetrek.com</p>
            <p className="mb-2">Phone: +123 456 7890</p>
            <p>Address: 123 Travel Lane, Adventure City</p>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="hover:text-blue-400"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400"
                aria-label="Twitter"
              >
                <FaTwitter />
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400"
                aria-label="Instagram"
              >
                <FaInstagram />
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p>
            &copy; {new Date().getFullYear()} Globe Trek. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
