import classes from "./MainNavigation.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import DrawerToggleButton from "../ui/drawerToggleButton/DrawerToggleButton";
import { useDispatch, useSelector } from "react-redux";
import {
  authActions,
  logout,
  getSingleUser,
  getLoginStatus,
} from "../../store/index";
import { AdminOnlyLink } from "../adminFolders/adminOnly/AdminOnlyRoute";
import { cartSliceActions } from "../../store/cart/cartIndex";

const MainNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  //console.log(user);
  const {cartTotalQty,cartItems} = useSelector((state)=>state.cart);
  //console.log(cartTotalQty);

  /* {isLoggedIn ? (user ? `hi ${user.name}` : "Hello!") : "Hello!"} */

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && user) {
      setDisplayName(user.name || "");
    }
  }, [isLoggedIn, user]);


  useEffect(()=>{
    dispatch(cartSliceActions.CART_TOTAL_QUANTITY())
  },[dispatch,cartItems]);

  const hideMenuHandler = () => {
    setShowMenu(false);
  };
  const toggleMenuHandler = () => {
    setShowMenu((currentState) => !currentState);
  };

  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  const logOutHandler = async () => {
    await dispatch(logout());
    dispatch(authActions.RESET_AUTH());
    navigate("/login");
  };

  const logo = (
    <div className={classes.logo}>
      <h1>
        <NavLink to={"/"} className={navDataHandler}>
          Sam<span>s</span>
        </NavLink>
      </h1>
    </div>
  );

  const cart = (
    <span>
      <NavLink to={"/cart"}>
        <div className={classes.cart}>
          <p>Cart</p>
          <FaShoppingCart size={20} />
          <p>{cartTotalQty}</p>
        </div>
      </NavLink>
    </span>
  );

  return (
    <header>
      <div className={classes.header}>
        {logo}
        <nav
          className={
            showMenu
              ? `${classes["show-navigation"]}`
              : `${classes["hide-navigation"]}`
          }>
          <div
            className={
              showMenu
                ? `${classes["nav-backdrop"]} ${classes["show-nav-backdrop"]}`
                : `${classes["nav-backdrop"]}`
            }></div>

          <ul>
            <AdminOnlyLink>
              <NavLink className={navDataHandler} to={"/admin/home"}>
                <li style={{ color: "red" }}>Admin</li>
              </NavLink>
            </AdminOnlyLink>

            <NavLink className={navDataHandler} to={"/shop"}>
              <li style={{ color: "red" }}>Shop</li>
            </NavLink>

            {!isLoggedIn && (
              <NavLink className={navDataHandler} to={"/login"}>
                Login
              </NavLink>
            )}
            {user ? (
              <NavLink className={navDataHandler} to={"/profile"}>
                {`Hello ${displayName}`}
              </NavLink>
            ) : (
              <NavLink className={navDataHandler} to={"/profile"}>
                {"Hello!"}
              </NavLink>
            )}

            {!isLoggedIn && (
              <NavLink className={navDataHandler} to={"/register"}>
                Register
              </NavLink>
            )}
            {isLoggedIn && (
              <NavLink className={navDataHandler} to={"/order-history"}>
                My Orders
              </NavLink>
            )}
            {isLoggedIn && (
              <Link to={"/"} onClick={logOutHandler}>
                Logout
              </Link>
            )}
            <span className={classes["span-cart"]}>{cart}</span>
          </ul>
        </nav>

        <div className={classes["mobile-icon"]}>
          {showMenu ? (
            <FaTimes size={22} color="black" onClick={hideMenuHandler} />
          ) : (
            <div className={classes["conditional-cart"]}>
              <span>{cart}</span>
              <DrawerToggleButton toggle={toggleMenuHandler} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
