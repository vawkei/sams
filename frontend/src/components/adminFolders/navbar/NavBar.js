import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import { IoIosAdd } from "react-icons/io";
import { GrOverview } from "react-icons/gr";
import {useSelector} from "react-redux";
import { BiCategory } from "react-icons/bi";
// import { BiSolidCoupon } from "react-icons/bi"
import { RiCoupon2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";



const NavBar = () => {

  const {user} = useSelector((state)=>state.auth);
  //console.log(user)

  const navDataHandler = (navData) => {
   return navData.isActive ? classes.active : "";
  };

  return (
    <div className={classes["nav-container"]}>
        <div className={classes.user}>
            <h3>Hello {user.name}</h3>
        </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink className={navDataHandler} to={"/admin/home"}>
              <FaHome size={40}/>
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"/admin/users"}>
            <FaRegUser size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"/admin/view-products"}>
              <GrOverview size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"add-product"}>
              <IoIosAdd size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"orders"}>
              <TbFileInvoice size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"coupon"}>
            {/* <BiSolidCoupon  size={40} /> */}
            <RiCoupon2Line  size={40}/>
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"category"}>
            <BiCategory size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"refund"}>
            <RiRefund2Line size={40} />
            </NavLink>
          </li>
          <li>
            <NavLink className={navDataHandler} to={"newsletter"}>
            <MdAlternateEmail size={40} />  
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
