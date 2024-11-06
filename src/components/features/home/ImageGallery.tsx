import Image from "next/image";
import Container from "../../UI/Container";

const ImageGallery = () => {
  return (
    <Container className="my-20">
      <div className="text-center mt-28 mb-14">
        <h5 className="text-lg italic">Explore Stunning Travel Photos</h5>
        <h2 className="text-6xl font-semibold">
          Essential Tips for Your Next Adventure
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1470&amp;q=80"
            alt="gallery-photo"
            width={1470}
            height={400}
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt="gallery-photo"
            width={1950}
            height={400}
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2560&amp;q=80"
            alt="gallery-photo"
            width={2560}
            height={400}
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2940&amp;q=80"
            alt="gallery-photo"
            width={2940}
            height={400}
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2762&amp;q=80"
            alt="gallery-photo"
            width={2762}
            height={400}
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2832&amp;q=80"
            alt="gallery-photo"
            width={2832}
            height={400}
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://demos.creative-tim.com/material-kit-pro/assets/img/examples/blog5.jpg"
            alt="gallery-photo"
            width={1200} // Adjust width according to your preference
            height={400} // Adjust height according to your preference
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://material-taillwind-pro-ct-tailwind-team.vercel.app/img/content2.jpg"
            alt="gallery-photo"
            width={1200} // Adjust width according to your preference
            height={400} // Adjust height according to your preference
          />
        </div>
        <div className="group">
          <Image
            className="object-cover object-center w-full h-40 max-w-full rounded-lg transition-transform transform group-hover:scale-110"
            src="https://images.unsplash.com/photo-1620064916958-605375619af8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1493&amp;q=80"
            alt="gallery-photo"
            width={1493}
            height={400}
          />
        </div>
      </div>
    </Container>
  );
};

export default ImageGallery;
