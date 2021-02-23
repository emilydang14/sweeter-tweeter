import React from "react";
import classes from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.loader_container}>
      <div className={classes.loader}></div>
      <p>Loading..</p>
    </div>
  );
};

export default Spinner;
