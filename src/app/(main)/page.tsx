import BlogCard from "@/src/components/cards/BlogCard";
import BannerSection from "@/src/components/features/home/BannerSection";
import HowGetStart from "@/src/components/features/home/HowGetStart";
import ImageGallery from "@/src/components/features/home/ImageGallery";
import NewsLatter from "@/src/components/features/home/NewsLatter";

import TravelFeatures from "@/src/components/features/home/TravelFeatures";
import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config";

import Link from "next/link";

export default async function HomePage() {
  const res = await fetch(`${envConfig.baseApi}/blog?limit=5`, {
    cache: "no-store"
  });
  const data = await res.json();

  const blogs = data?.data;
  console.log(blogs);

  return (
    <div>
      <section className="mt-[-70px]">
        <BannerSection />
        <TravelFeatures />
        <Container className="my-8">
          <div>
            <div className="text-center mt-28 mb-14">
              <h5 className="text-lg italic">Latest Posts</h5>
              <h2 className="text-6xl font-semibold">
                Popular travel blog posts & guides
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {blogs?.map((blog: any) => (
                <BlogCard blog={blog} key={blog?._id} />
              ))}
            </div>
            <div className="flex items-center justify-center ">
              <Link href="/blog">
                <button
                  className=" border dark:text-white hover:text-white font-bold text-2xl py-2 px-4 rounded flex
               hover:bg-black hover:border-0 transition ease-in-out duration-300 transform hover:scale-105"
                >
                  Read More
                </button>
              </Link>
            </div>
          </div>
        </Container>
        <HowGetStart />
        <ImageGallery />
        <NewsLatter />
      </section>
    </div>
  );
}
