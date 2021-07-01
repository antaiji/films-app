import React from "react";

import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={styles.header}>
      <div
        onClick={() => props.toggleSingle({}, false)}
        className={styles.header__logo}
      >
        React Movies
      </div>
    </div>
  );
};

export default Header;
