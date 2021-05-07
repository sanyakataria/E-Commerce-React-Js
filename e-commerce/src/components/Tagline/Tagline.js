import { useRef } from "react";
import classes from "./Tagline.module.css";

function Tagline(props) {
  const inputRef = useRef();

  const searchProduct = () => {
    props.onProductSearch(inputRef.current?.value);
  };

  return (
    <div className={classes.tagline}>
      <h1>Stay Home and Shop Online</h1>
      <form>
        <input
          className={classes.search}
          ref={inputRef}
          placeholder="Search"
          onKeyUp={searchProduct}
        />
      </form>
    </div>
  );
}

export default Tagline;
