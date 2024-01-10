import AddProduct from "../add-product/AddProduct";
import Home from "../home/Home";
import NavBar from "../navbar/NavBar";
import Orders from "../orders/Orders";
import AllProducts from "../view-products/AllProducts";
import Category from "../category/Category";
import classes from "./AdminRoutes.module.css";
import { Route,Routes } from "react-router-dom";
import EditProduct from "../add-product/EditProduct";
import Coupon from "../coupon/Coupon"


const AdminRoutes = () => {
    return ( 
        <div className={classes.admin}>
            <div className={classes["nav-bar"]}>
                <NavBar />
            </div>
            <div className={classes.content}>
                <Routes>
                    <Route  path="home" element={<Home />} />
                    <Route  path="view-products" element={<AllProducts />}/>
                    <Route  path="add-product" element={<AddProduct />}/>
                    <Route  path="orders" element={<Orders />}/>
                    <Route  path="category" element={<Category />} />
                    <Route  path="coupon" element={<Coupon />} />

                    <Route  path="edit-product/:id" element={<EditProduct />} />
                </Routes>
            </div>
        </div>
        
     );
}
 
export default AdminRoutes;