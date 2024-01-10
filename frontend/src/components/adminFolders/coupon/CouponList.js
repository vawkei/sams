import classes from "./CouponList.module.css";
import Loader from "../../ui/loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import DeleteNotifier from "../../ui/deleteNotifier/DeleteNotifier";
import Card from "../../ui/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCoupon, getCoupons } from "../../../store/coupon/couponIndex";

const CouponList = () => {
  const [showDeleteNotifier, setShowDeleteNotifier] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState(null);

  const showDeleteNotifierTrue = (couponName) => {
    setShowDeleteNotifier(true);
    setCouponToDelete(couponName);
  };

  const showDeleteNotifierFalse = () => {
    setShowDeleteNotifier(false);
    setCouponToDelete(null);
  };

  const deleteCouponHandler = async () => {
    await dispatch(deleteCoupon(couponToDelete));
    await dispatch(getCoupons());
    setShowDeleteNotifier(false);
  };

  const { coupons, isLoading } = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  return (
    <div className={classes["coupon-list"]}>
      <h2>
        {" "}
        <b>All Coupons</b>{" "}
      </h2>
      <Card>
        {isLoading && <Loader />}
        {coupons.length === 0 ? (
          <p>No Coupons Found</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Coupon name</th>
                  <th>Discount</th>
                  <th>Date created</th>
                  <th>Expiry Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon, index) => {
                  return (
                    <tr key={coupon._id}>
                      <td>{index + 1}</td>
                      <td>{coupon.name}</td>
                      <td>{coupon.discount} %</td>
                      <td>{new Date(coupon.createdAt).toDateString()}</td>
                      <td>
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                      </td>
                      <td>
                        <FaTrashAlt
                          size={16}
                          color="red"
                          onClick={() => showDeleteNotifierTrue(coupon.name)}
                        />
                      </td>
                      {showDeleteNotifier && (
                        <DeleteNotifier
                          heading={"Delete Coupon"}
                          body={`You are about to Delete ${couponToDelete}`}
                          onConfirm={deleteCouponHandler}
                          cancel={showDeleteNotifierFalse}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </Card>
    </div>
  );
};

export default CouponList;
