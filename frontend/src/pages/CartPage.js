import { Helmet } from "react-helmet-async";
import Cart from "../components/cart/Cart";

const CartPage = () => {
  const currentUrl = process.env.REACT_APP_FRONTEND_URL;
  const pagePath = "/cart";
  const fullUrl = `${currentUrl}${pagePath}`;

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
        <meta property="og:title" content="Your Shopping Cart" />
        <link rel="canonical" href={fullUrl} />
        <meta
          name="description"
          content="View and manage items in your shopping cart. Proceed to checkout to complete your purchase."
        />
        <meta
          property="og:description"
          content="View and manage items in your shopping cart."
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1>Shopping Cart</h1>
      <Cart />
    </div>
  );
};

export default CartPage;
