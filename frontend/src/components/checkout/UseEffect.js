import { useEffect } from "react";
import { useSelector } from "react-redux";

const UseEffect = () => {
  const { product } = useSelector((state) => state.product);
  console.log(product);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {}, []);

  return <h2>UseEffect Practice</h2>;
};

export default UseEffect;
