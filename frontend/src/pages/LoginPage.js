import { Helmet } from "react-helmet-async";
import Login from "../components/auth/Login";

const LoginPage = () => {
  const currentUrl = process.env.REACT_APP_FRONTEND_URL;
  const pagePath = "/login";
  const fullUrl = `${currentUrl}${pagePath}`;

  return (
    <div>
      <Helmet>
        <title>Login</title>

        <meta property="og:title" content="Login to sams" />
        <link rel="canonical" href={fullUrl} />
        <meta
          property="og:description"
          content="Log in to your account on sams and enjoy a seamless food ordering experience."
        />
        <meta
          name="description"
          content="Welcome to sams, your go-to destination for hassle-free food delivery in Ovwian Town. place your order with ease, and enjoy swift delivery to your doorstep."
        />
        <meta
          property="og:image"
          //   will add this later, will create a link on cloudinary
          content="URL to an image related to your login page"
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Login />
    </div>
  );
};

export default LoginPage;
