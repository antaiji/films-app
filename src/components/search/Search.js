import React, { Component } from "react";
import Radio from "./Radio";

import styles from "./Search.module.css";

class Search extends Component {
  state = {
    searchTerm: "",
    selector: "movie",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendData = (event) => {
    event.preventDefault();
    this.props.searchIt(this.state.searchTerm, this.state.selector);
    this.setState({ searchTerm: "" });
  };

  render() {
    return (
      <div className={styles.search}>
        <div className={styles.search__top}>
          <div className={styles.search__selector}>
            <select
              name="selector"
              value={this.state.selector}
              onChange={this.handleChange}
              className={styles["search__selector-select"]}
            >
              <option
                className={styles["search__selector-select"]}
                value="movie"
              >
                Movie
              </option>
              <option
                className={styles["search__selector-select"]}
                value="person"
              >
                Actor
              </option>
            </select>
          </div>
          <div className={styles.search__form}>
            <form
              className={styles["search__form-form"]}
              onSubmit={this.sendData}
            >
              <input
                type="text"
                className={styles.search__input}
                placeholder="Search.."
                name="searchTerm"
                value={this.state.searchTerm}
                onChange={this.handleChange}
              />
              <button type="submit" className={styles.search__button}>
                Search
              </button>
            </form>
          </div>
        </div>
        <Radio
          filterByGenres={this.props.filterByGenres}
          genres={this.props.genres}
        />
      </div>
    );
  }
}

export default Search;
