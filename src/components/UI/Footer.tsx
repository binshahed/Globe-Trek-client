import Container from "@/src/components/UI/Container";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin
} from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-default-100 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Travel Info Section */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo1.png"
                alt="Globe Trek Logo"
                width={200}
                height={100}
              />
            </div>
            <p className="text-sm  max-w-xs">
              Your go-to platform for unforgettable travel experiences. Discover
              destinations, book adventures, and explore the world with us.
            </p>
            <div className="flex items-center space-x-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-blue-500"
              >
                <FaFacebookF size={20} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="hover:text-blue-500"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-500"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="hover:text-blue-700"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-500">
                  Contact
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-blue-500">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Email: info@globetrek.com</p>
            <p className="text-sm mb-2">Phone: +123 456 7890</p>
            <p className="text-sm">Address: 123 Travel Lane, Adventure City</p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 text-center text-sm border-t border-gray-300 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Globe Trek. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
