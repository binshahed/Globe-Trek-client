import BannerSection from "@/src/components/features/home/BannerSection";
import BlogSection from "@/src/components/features/home/BlogSection";
import TravelFeatures from "@/src/components/features/home/TravelFeatures";
import Container from "@/src/components/UI/Container";


export default async function HomePage() {
  // const res = await fetch(`${envConfig.baseApi}/blog?limit=2`, {
  //   cache: "no-store"
  // });
  // const data = await res.json();

  // const blogs = data?.data;

  return (
    <section className="mt-[-70px]">
      <BannerSection />
      <TravelFeatures />
      <Container className="my-8">
        <BlogSection />
      </Container>
    </section>
  );
}
