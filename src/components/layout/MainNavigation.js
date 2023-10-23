import classes from "./MainNavigation.module.css";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useState } from "react";
import DrawerToggleButton from "../ui/drawerToggleButton/DrawerToggleButton";

const MainNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);

  const hideMenuHandler = () => {
    setShowMenu(false);
  };
  const toggleMenuHandler = () => {
    setShowMenu((currentState) => !currentState);
  };

  const navDataHandler = (navData) => {
    return navData.isActive ? classes.active : "";
  };

  const logo = (
    <div className={classes.logo}>
      <h1>
        Sam<span>s</span>
      </h1>
    </div>
  );

  const cart = (
    <span>
      <Link to={"/cart"}>
        <div className={classes.cart}>
          <p>Cart</p>
          <FaShoppingCart size={20} />
          <p>0</p>
        </div>
      </Link>
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
            <NavLink>
              <li style={{ color: "red" }}>Shop</li>
            </NavLink>

            <NavLink className={navDataHandler} to={"/login"}>
              Login
            </NavLink>
            <NavLink className={navDataHandler} to={"/profile"}>
              displayName
            </NavLink>
            <NavLink className={navDataHandler} to={"/register"}>
              Register
            </NavLink>
            <NavLink className={navDataHandler}>My Orders</NavLink>
            <Link to={"/"}>Logout</Link>
            <span className={classes["span-cart"]}>{cart}</span>
          </ul>
        </nav>

        <div className={classes["mobile-icon"]}>
          {showMenu ? (
            <FaTimes size={22} color="black" onClick={hideMenuHandler} />
          ) : (
            <div className={classes["conditional-cart"]}>
              <span >{cart}</span>
              <DrawerToggleButton toggle={toggleMenuHandler} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
