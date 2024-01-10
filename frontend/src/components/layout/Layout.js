import MainFooter from "./MainFooter";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div>
      <MainNavigation />
      <main style={{width:"100%",maxWidth:"70rem", margin:"0.5rem auto"}}>{props.children}</main>
      <MainFooter />
    </div>
  );
};

export default Layout;

