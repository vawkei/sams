import MainFooter from "./MainFooter";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main>{props.children}</main>
      <MainFooter />
    </div>
  );
};

export default Layout;

{/* <main style={{ width: "100%", maxWidth: "60rem", margin: "3rem auto" }}> */}