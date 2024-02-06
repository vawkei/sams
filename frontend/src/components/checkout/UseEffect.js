import { useEffect } from "react";
import { useSelector } from "react-redux";


const UseEffect = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { incomingOrder } = useSelector((state) => state.form);
  
  console.log(incomingOrder);
  

  useEffect(() => {}, []);

  return <h2>UseEffect Practice</h2>;
};

export default UseEffect;
