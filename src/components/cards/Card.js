import React from "react";

import styles from "./Card.module.css";

const handleClick = (prps, func) => {
  // console.log(prps);
  func(prps, true);
};

const Card = (props) => {
  return (
    <div className={styles.cards__card}>
      <img
        src={props.imgBaseUrl + props.all.poster_path}
        className={styles.cards__img}
        alt="movie"
      />
      <div className={styles.cards__container}>
        <h4 className={styles["cards__container-title"]}>{props.all.title}</h4>
        <p>Release date: {props.all.release_date}</p>
        <p>Rating: {props.all.vote_average}</p>
        <p
          className={styles["cards__container-more"]}
          onClick={() => handleClick(props.all, props.toggleSingle)}
        >
          Read More...
        </p>
      </div>
    </div>
  );
};

export default Card;
