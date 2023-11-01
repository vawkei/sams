import classes from "./MainNavigation.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import DrawerToggleButton from "../ui/drawerToggleButton/DrawerToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions, logout, getSingleUser } from "../../store/index";

const MainNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  // console.log(user);
  
    /* {isLoggedIn ? (user ? `hi ${user.name}` : "Hello!") : "Hello!"} */
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      dispatch(getSingleUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      setDisplayName(user.name || "");
    }
  }, [user]);

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
          <p>0</p>
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
            <NavLink>
              <li style={{ color: "red" }}>Shop</li>
            </NavLink>

            <NavLink className={navDataHandler} to={"/login"}>
              Login
            </NavLink>
            {user ? (
              <NavLink className={navDataHandler} to={"/profile"}>
              {`Hello ${displayName}`} 
            </NavLink>  
            ):(
              <NavLink className={navDataHandler} to={"/profile"}>
              {"Hello!"}
            </NavLink>
            )}

            <NavLink className={navDataHandler} to={"/register"}>
              Register
            </NavLink>
            <NavLink className={navDataHandler} to={"/orders"}>
              My Orders
            </NavLink>
            <Link to={"/"} onClick={logOutHandler}>
              Logout
            </Link>
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
