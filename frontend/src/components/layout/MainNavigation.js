//This was the state of the code when Ese came:
import classes from "./MainNavigation.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import DrawerToggleButton from "../ui/drawerToggleButton/DrawerToggleButton";
import { useDispatch, useSelector } from "react-redux";
import { authActions, logout } from "../../store/index";
import { AdminOnlyLink } from "../adminFolders/adminOnly/AdminOnlyRoute";
import { cartSliceActions } from "../../store/cart/cartIndex";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import io from "socket.io-client";
import { orderSliceActions } from "../../store/order/orderIndex";

const MainNavigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // const [newOrderCount, setNewOrderCount] = useState(0);
  // const [newOrder, setNewOrder] = useState(null);

  const { user, isLoggedIn } = useSelector((state) => state.auth);
  //console.log(user);
  const { cartTotalQty, cartItems } = useSelector((state) => state.cart);
  //console.log(cartTotalQty);
  const { newOrderCount } = useSelector((state) => state.order);
  console.log(newOrderCount);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (isLoggedIn && user) {
      setDisplayName(user.name || "");
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    dispatch(cartSliceActions.CART_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

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
    // dispatch(cartSliceActions.RESET_CART());
    navigate("/login");
  };

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
      // path: "/api/v1/orders",
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      // Set up event listener after the connection is established
      socket.on("newlyCreatedOrder", (order) => {
        console.log("newlyCreatedOrder:", order);

        //setNewOrder(order);
        // console.log(newOrder);
        // setNewOrderCount((currentState) => currentState + 1);
        // const updatedOrderCount = newOrderCount + 1;
        // localStorage.setItem("newlyCreatedOrder", updatedOrderCount);

        dispatch(orderSliceActions.ADD_NEW_ORDER_COUNT());
      });
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    // Clean up the effect
    return () => {
      socket.disconnect();
    };
  }, [dispatch, newOrderCount]);

  const logo = isMobile ? (
    <motion.div
      initial={{ x: "1000" }}
      animate={{
        x: 0,
        transition: { delay: 2, type: "spring", stiffness: 100 },
      }}
      className={classes.logo}>
      <h1>
        <NavLink to={"/"} className={navDataHandler}>
          Sam<span>s</span>
        </NavLink>
      </h1>
    </motion.div>
  ) : (
    <div className={classes.logo}>
      <h1>
        <NavLink to={"/"} className={navDataHandler}>
          Sam<span>s</span>
        </NavLink>
      </h1>
    </div>
  );

  const cart = isMobile ? (
    <span>
      <NavLink to={"/cart"}>
        <motion.div
          initial={{ x: "-1000" }}
          animate={{
            x: 0,
            transition: {
              delay: 2,
              type: "spring",
              stiffness: 100,
            },
          }}
          className={classes.cart}>
          <p>Cart</p>
          <FaShoppingCart size={20} />
          <p>{cartTotalQty}</p>
        </motion.div>
      </NavLink>
    </span>
  ) : (
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

          <ul onClick={toggleMenuHandler}>
            <AdminOnlyLink>
              <NavLink className={navDataHandler} to={"/admin/home"}>
                <li style={{ color: "red" }}>
                  {`Admin ${localStorage.getItem("newlyCreatedOrder")}`}
                </li>
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
              <NavLink className={navDataHandler} to={"/contact"}>
                Send a Mail
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
              {isMobile ? (
                <motion.span
                  initial={{ y: -100 }}
                  animate={{
                    y: 0,
                    transition: { delay: 1.5, type: "spring", stiffness: 500 },
                  }}>
                  <DrawerToggleButton toggle={toggleMenuHandler} />
                </motion.span>
              ) : (
                <DrawerToggleButton toggle={toggleMenuHandler} />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
