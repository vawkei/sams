import { useEffect } from "react";
import { useSelector } from "react-redux";


const UseEffect = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const { incomingOrder } = useSelector((state) => state.order);
  console.log(incomingOrder);
  // const formData = localStorage.getItem(JSON.parse("formData"));
  const formDataString = localStorage.getItem("formData");
const formDataObject = JSON.parse(formDataString);

  console.log(formDataObject)

  useEffect(() => {}, []);

  return <h2>UseEffect Practice</h2>;
};

export default UseEffect;
