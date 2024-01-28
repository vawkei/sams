import classes from "./Search.module.css";
import { BiSearch } from "react-icons/bi";

const Search = (props) => {
  return (
    <div className={`${classes.search} ${props.className}`}>
      <BiSearch size={18}  className={classes.icon}/>
      <input
        placeholder="search"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Search;
