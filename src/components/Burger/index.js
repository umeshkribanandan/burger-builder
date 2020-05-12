import React from "react";

import styles from "./burger.module.css";
import Ingredient from "./Ingredient";

const Burger = (props) => {
  let transformedIngredients =
    props.ingredients &&
    Object.keys(props.ingredients)
      .map((ig) => {
        return [...Array(props.ingredients[ig])].map((_, i) => {
          return <Ingredient key={ig + i} type={ig} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
  if (transformedIngredients && transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top" />
      {transformedIngredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
