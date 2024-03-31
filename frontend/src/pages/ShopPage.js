import { Helmet } from "react-helmet-async";
import Products from "../components/shop/products/Products";

const ShopPage = () => {
  const currentUrl = process.env.REACT_APP_FRONTEND_URL;
  const pagePath = "/shop";
  const fullUrl = `${currentUrl}${pagePath}`;

  return (
    <div>
      <Helmet>
        <title>Shop</title>
        <meta property="og:title" content="Explore the Shop at sams" />
        <link rel="canonical" href={fullUrl} />
        <meta
          property="og:description"
          content="Discover a variety of delightful items at the sams shop. Explore our selection and find the perfect products to enhance your culinary experience in Ovwian Town."
        />
        <meta
          name="description"
          content="Visit the sams shop, your one-stop destination for premium culinary delights in Ovwian Town. Explore a diverse range of meals to elevate your food experience."
        />
        <meta
          property="og:image"
          //   will add this later, will create a link on cloudinary
          content="URL to an image related to your shop page"
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* <h2>Shop Page</h2> */}
      <Products />
    </div>
  );
};

export default ShopPage;
