import { Helmet } from "react-helmet-async";
import Register from "../components/auth/Register";

export const RegisterPage = () => {
  const currentUrl = process.env.REACT_APP_FRONTEND_URL;
  const pagePath = "/register";
  const fullUrl = `${currentUrl}${pagePath}`;

  return (
    <div>
      <Helmet>
        <title>Register</title>

        <meta property="og:title" content="Register at sams" />
        <link rel="canonical" href={fullUrl} />
        <meta
          property="og:description"
          content="Create an account at sams and unlock a world of seamless food ordering in Ovwian Town."
        />
        <meta
          name="description"
          content="Join sams, your go-to destination for hassle-free food delivery in Ovwian Town. Create an account, place your orders effortlessly, and delight in swift doorstep delivery."
        />
        <meta
          property="og:image"
          //   will add this later, will create a link on cloudinary
          content="URL to an image related to your register page"
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Register />
    </div>
  );
};

export default RegisterPage;
