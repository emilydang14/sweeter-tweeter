import React from "react";
import classes from "./Button.module.css";

/* choose shape: round or oval. Oval: padding 10px 15px . Circle can choose size */

const Button = ({ name, shape, onClick, disabled }) => {
  let button = <button className={classes.normalBtn}>{name}</button>;
  if (shape === "oval") {
    button = (
      <button className={classes.ovalBtn} onClick={onClick}>
        {name}
      </button>
    );
  }
  if (shape === "round_big") {
    button = (
      <button className={classes.roundBtn_big} onClick={onClick}>
        {name}
      </button>
    );
  }
  if (shape === "round_small") {
    button = (
      <button
        className={classes.roundBtn_small}
        onClick={onClick}
        disabled={disabled}
      >
        {name}
      </button>
    );
  }

  return button;
};

export default Button;
