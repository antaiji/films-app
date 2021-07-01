import React from "react";
import Card from "./Card";

import styles from "./Cards.module.css";

const Cards = (props) => {
  return (
    <div className={styles.cards}>
      {props.items.map((item) => {
        return (
          <Card
            key={item.id}
            toggleSingle={props.toggleSingle}
            imgBaseUrl={props.imgBaseUrl}
            all={item}
          />
        );
      })}
    </div>
  );
};

export default Cards;
