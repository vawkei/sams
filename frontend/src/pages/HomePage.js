import { Helmet } from "react-helmet-async";
import Home from "../components/home/Home";

const HomePage = () => {

  const currentUrl = process.env.REACT_APP_FRONTEND_URL;
  // const pagePath = '/home';
  const fullUrl = `${currentUrl}`;

  const cloudinaryImageUrl =
    "https://res.cloudinary.com/your-cloud-name/image/upload/your-image.jpg"; //will have to put a picture on cloudinary and use the link here.

  return (
    <div style={{ margin: "-3rem auto" }}>
     
      <Helmet>
        <title>Home</title>
        <link rel="canonical" href={fullUrl} />
        <meta
          name="description"
          content="Explore the exciting offerings on our local food delivery app. Order delicious dishes and enjoy swift delivery to your doorstep. Discover a diverse menu and savor the flavors of your favorite cuisines"
        />
        <meta name="author" content="sams" />
        <meta property="og:title" content="Home" />
        <meta
          property="og:description"
          content="Savor the flavors of Ovwian Town with our exclusive food delivery service. Order delectable dishes from sams and enjoy the taste of local cuisine delivered straight to your doorstep. Experience the convenience of hassle-free online ordering, swift delivery, and a diverse menu showcasing the best of Ovwian's culinary delights."
        />
        <meta property="og:image" content={cloudinaryImageUrl} />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={fullUrl} />{" "}
        {/* Use the actual name of your restaurant */}
      </Helmet>

      <Home />
    </div>
  );
};

export default HomePage;
