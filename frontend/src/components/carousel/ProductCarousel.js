import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from "./Responsive";
import classes from "./CarouselItems.module.css";
import Button from "../ui/button/Button";
import { carouselData } from "./CarousalData";
import Card from "../ui/card/Card";
import { useNavigate } from "react-router-dom";

var nairaSymbol = "\u20A6";


const ProductCarousel = () => {
  
  const navigate = useNavigate();

const navigateToShopHandler =()=>{
  navigate("/shop")
};

const products = carouselData.map((data) => {
  return (
    <Card key={data._id} className={classes.cardClass}>
      <img src={data.url} alt="product image" />
      <div className={classes.content}>
        <h2>{data.name}</h2>
        <p>
          {nairaSymbol}
          {data.price}
        </p>
        <p>{data.description}</p>
        <div className={classes.action}>
          <Button className={classes.btn} onClick={navigateToShopHandler}>Order Now</Button>
        </div>
      </div>
    </Card>
  );
});


  return (
    
    <div>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={300}
        customTransition="all 500ms ease"
        transitionDuration={1000}
        showDots={false}
        
        >
        {products }
      </Carousel>
    </div>
  );
};

export default ProductCarousel;

{
  /* <div className={classes.card}>
          <img
            src="https://i.ibb.co/mN6K9rY/samscarouseltoastedbread.jpg"
            alt="product image"
          />
          <h2>toasted bread</h2>
          <p># 500</p>
          <p>some description about product</p>
          <p>
            <button>Add to cart</button>
          </p>
        </div>
        <div className={classes.card}>
          <img
            src="https://i.ibb.co/vVRbDPF/samscarouselpancake-1.jpg"
            alt="product image"
          />
          <h2>toasted bread</h2>
          <p># 500</p>
          <p>some description about product</p>
          <p>
            <button>Add to cart</button>
          </p>
        </div>
        <div className={classes.card}>
          <img
            src="https://i.ibb.co/BwPgkq5/samscarouseliyan.jpg"
            alt="product image"
          />
          <h2>toasted bread</h2>
          <p># 500</p>
          <p>some description about product</p>
          <p>
            <button>Add to cart</button>
          </p>
        </div>
        <div className={classes.card}>
          <img
            src="https://i.ibb.co/6B6RD7r/samscarouselegusi.jpg"
            alt="product image"
          />
          <h2>toasted bread</h2>
          <p># 500</p>
          <p>some description about product</p>
          <p>
            <button>Add to cart</button>
          </p>
        </div> */
}

// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5,
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//   },
// };

// const ProductCarousel = () => {
//   return (
//     <Carousel responsive={responsive}>
//       <div className="card">

//       </div>
//       <div>Item 2</div>
//       <div>Item 3</div>
//       <div>Item 4</div>
//     </Carousel>
//   );
// };

// export default ProductCarousel;
