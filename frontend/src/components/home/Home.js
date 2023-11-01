import ProductCarousel from "../carousel/ProductCarousel";
//import SimpleSlider from "../carousel/ProductCarousel";
import Slider from "../slider/Slider";
import HomeInfoBox from "./HomeInfoBox";

const Home = () => {
    return ( 
        <div>
            <Slider />
            <HomeInfoBox />
            {/* <ProductCarousel /> */}
            {/* <SimpleSlider /> */}
        </div>
     );
}
 
export default Home;