import classes from "./HomeInfoBox.module.css";

import { dataInfo } from "./HomeInfoBoxData";

const HomeInfoBox = () => {
    return ( 
        <div  className={classes.container}>
            {dataInfo.map((data,index)=>{
                return(
                    <div key={index} className={classes.container2}>
                        <div className={classes.image}>
                            <div>{data.icon}</div>
                        </div>
                        <div className={classes.content}>
                                <h3>{data.heading}</h3>
                                <p>{data.description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default HomeInfoBox;