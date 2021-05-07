import classes from "./Help.module.css";
import { Link } from "react-router-dom";

function Help(props) {
  return (
      <div className={classes.help}>
      <h1>Contact Us</h1>
      <form className={classes.form}>
          <input className={classes.input} placeholder="FULL NAME"></input>
          <br/>
          <textarea className={classes.query} rows="5" placeholder="Write your query here."></textarea>
          <br/>
          <Link to="/">
          <button className={classes.btn} type="submit">Submit</button>
          </Link>
      </form>
    </div>
  );
}

export default Help;
