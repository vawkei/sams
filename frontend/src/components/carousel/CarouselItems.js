import classes from "./CarouselItems.module.css";

import { carouselData } from "./CarousalData";
import Card from "../ui/card/Card";
import Button from "../ui/button/Button";

const CarouselItems = () => {
  var nairaSymbol = "\u20A6";

  const data = carouselData.map((data, index) => {
    return (
      <li key={index}>
        <Card className={classes.li}>
          <img src={data.url} alt="pic" width={"120"} />
          <p>
            {nairaSymbol}
            {data.price}
          </p>
          <p>{data.name}</p>
          <p>{data.description}</p>
          <Button className={classes.btn}>Buy</Button>
        </Card>
      </li>
    );
  });

  return <ul className={classes["items-container"]}>{data}</ul>;
};

export default CarouselItems;











// import classes from "./CarouselItems.module.css";
// import { Link } from "react-router-dom";
// import { carouselData } from "./CarousalData";
// //import Card from "../ui/card/Card";
// //import { shortenText } from "../../utils";

// const CarouselItems = (props) => {

//     const items = carouselData.map((item)=>{
//         return(
//             <div className={classes["carouselItem"]}>
//             <Link to={"/product-details"}>
//                 <img className={classes["product--image"]} src={item.url} alt={item.url} />
//                 <p className="price">{`$${item.price}`}</p>
//                 <h4>{item.name.slice(0,15)}...</h4>
//                 <p className="--mb">{item.description}</p>
//             </Link>
//             <button className="--btn --btn-primary --btn-block">Add to Cart</button>
//         </div>
//         )
//     })

//     return (
//         <div>
//             {items}
//         </div>
//      );
// }

// export default CarouselItems;
