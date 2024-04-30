import { Helmet } from "react-helmet-async";
import ContactForm from "../components/contact/ContactForm";

const ContactPage = () => {
  const currentUrl = process.env.REACT_APP_FRONTEND_URL;
  const pagePath = "/contact";
  const fullUrl = `${currentUrl}${pagePath}`;

  return (
    <div>
      <Helmet>
      <title>Contact Us</title>
        <meta property="og:title" content="Explore the Shop at sams" />
        <link rel="canonical" href={fullUrl} />
        <meta
          property="og:description"
          content="Get in touch with us using the contact form or our contact details. We'd love to hear from you!"
        />
        <meta
          name="description"
          content="Get in touch with us using the contact form or our contact details. We'd love to hear from you!"
        />
        <meta
          property="og:image"
          //   will add this later, will create a link on cloudinary
          content="URL to an image related to your shop page"
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
      </Helmet>
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
};

export default ContactPage;
