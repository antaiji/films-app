import React, { Component } from "react";

import styles from "./Radio.module.css";

class Radio extends Component {
  state = {
    id: null,
  };

  handleChange = (event) => {
    this.setState({ id: event.target.value }, this.sendGenre);
  };

  sendGenre = () => {
    this.props.filterByGenres(Number(this.state.id));
  };

  render() {
    return (
      <div className={styles.search__bottom}>
        <div className={styles["search__bottom-text"]}>
          Filter search result by genre:
        </div>
        <div className={styles.radio}>
          {this.props.genres.map((prop) => {
            return (
              <label key={prop.id} className={styles.radio__container}>
                <input
                  type="radio"
                  name={prop.name}
                  value={prop.id}
                  checked={prop.id === Number(this.state.id)}
                  onChange={this.handleChange}
                />
                <span className={styles.radio__span}>{prop.name}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Radio;
