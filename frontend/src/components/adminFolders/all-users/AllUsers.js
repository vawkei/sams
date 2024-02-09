import classes from "./AllUsers.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../store";
import { useEffect, useState } from "react";
import Search from "../../ui/search/Search";
import { getAdminOrders } from "../../../store/order/orderIndex";
import { filteredUserSliceAction } from "../../../store/filterUser";
import Loader from "../../ui/loader/Loader"

const AllUsers = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { users,isLoading } = useSelector((state) => state.auth);
  console.log(users);
  const { adminOrders } = useSelector((state) => state.order);
  //console.log(adminOrders);
  const { filteredUser } = useSelector((state) => state.filterUser);
  console.log(filteredUser);

  //To add up the orderAmount of each user, by using the userId in createdBy
  let array = [];
  const admTotalOrderAmount = adminOrders.reduce((accumulator, order) => {
    let person = accumulator[order.createdBy] || 0;
    accumulator[order.createdBy] = person + order.orderAmount;
    return accumulator;
  }, {});
  array.push(admTotalOrderAmount);
  // console.log(array);

  //to turn our array that hs only one object into an array with multible objects:
  let newArray = Object.entries(admTotalOrderAmount).map(
    ([id, totalAmount]) => ({ id, totalAmount })
  );
  // console.log(newArray);

  useEffect(() => {
    dispatch(
      filteredUserSliceAction.FILTER_BY_SEARCH({ users: users, search })
    );
  }, [dispatch, users, search]);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAdminOrders());
  }, [dispatch]);

  var nairaSymbol = "\u20A6";

  return (
    <div className={classes["user-container"]}>
      {isLoading && <Loader />}
      <h2>All Users</h2>
      <div className={classes.search}>
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={classes.searchComp}
        />
      </div>
      <table className={classes.tablez}>
        <thead>
          <tr>
            <th>s/n</th>
            <th>Name</th>
            <th>Registered</th>
            <th>Town</th>
            <th>Spent</th>
          </tr>
        </thead>
        <tbody>
          {filteredUser?.map((user, index) => {
            // {users?.map((user, index) => {
           
            // Find the corresponding entry in newArray based on user ID
            const matchingAmount = newArray.find(
              (amount) => amount.id === user._id
            );
            return (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className={classes["name-content"]}>
                    <div className={classes["main-image"]}>
                      <img src={user.photo} alt="user-photo" />
                    </div>
                    <div className={classes.name}>
                      <span>
                        <b>{user?.name} </b>
                      </span>
                      <span>
                        <b>{user?.surname}</b>
                      </span>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                </td>
                <td>{new Date(user?.verifiedDate).toDateString()}</td>
                <td>{user?.town}</td>
                <td>
                  {nairaSymbol} {matchingAmount
                    ? matchingAmount.totalAmount
                    : "Dude hasn't made a puchase"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
