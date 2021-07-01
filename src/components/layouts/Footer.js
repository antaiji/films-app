import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__text}>Copyleft @ 2021</div>
    </footer>
  );
};

export default Footer;
