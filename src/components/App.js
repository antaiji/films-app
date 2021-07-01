import React, { Component, Fragment } from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Search from "./search/Search";
import Cards from "./cards/Cards";
import Single from "./cards/Single";
import Loader from "./helpers/Loader";

import styles from "./App.module.css";

const API__KEY = process.env.REACT_APP_API_KEY;

class App extends Component {
  //apiKey = API__KEY;
  apiBaseUrl = "https://api.themoviedb.org/3";
  nowPlayingUrl = `${this.apiBaseUrl}/movie/now_playing?api_key=${API__KEY}`;
  imageBaseUrl = "https://image.tmdb.org/t/p/w300";
  genresUrl = `${this.apiBaseUrl}/genre/movie/list?api_key=${API__KEY}&language=en-US`;

  state = {
    nowPlayingItems: [],
    genres: [],
    isLoaded: false,
    nothingFound: false,
    singleData: {},
    isSingleTrue: false,
  };

  componentDidMount() {
    fetch(this.nowPlayingUrl)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ nowPlayingItems: response.results });
        this.setState({ isLoaded: true });
      })
      .catch((error) => {
        this.setState({ nothingFound: true });
      });

    fetch(this.genresUrl)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ genres: response.genres });
        // console.log(this.state.genres);
      })
      .catch((error) => {
        this.setState({ nothingFound: true });
      });
  }

  filterByGenres = (id) => {
    const filteredItems = this.state.nowPlayingItems.filter((item) => {
      return item.genre_ids.find((item) => item === id);
    });
    this.setState({ nowPlayingItems: filteredItems });
  };

  searchMovies = (searchTerm, selector) => {
    if (searchTerm.length === 0) {
      return alert("Please enter the search criteria...");
    }
    const userSearchTerm = encodeURI(searchTerm);
    fetch(
      `${this.apiBaseUrl}/search/${selector}?query=${userSearchTerm}&api_key=${API__KEY}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (selector === "person") {
          this.setState({ nowPlayingItems: response.results[0].known_for });
        } else {
          this.setState({ nowPlayingItems: response.results });
        }
        this.setState({ isLoaded: true });
      })
      .catch((error) => {
        this.setState({ nothingFound: true });
      });
  };

  toggleSingle = (singleData, isSingleTrue) => {
    this.setState({ singleData: singleData });
    this.setState({ isSingleTrue: isSingleTrue });
  };

  render = () => {
    let value = null;
    let singleOrNot = null;

    if (this.state.nowPlayingItems.length > 0) {
      value = (
        <Fragment>
          <Search
            filterByGenres={this.filterByGenres}
            genres={this.state.genres}
            searchIt={this.searchMovies}
          />
          <Cards
            imgBaseUrl={this.imageBaseUrl}
            items={this.state.nowPlayingItems}
            toggleSingle={this.toggleSingle}
          />
        </Fragment>
      );
    }

    if (this.state.nowPlayingItems.length === 0) {
      value = <div className={styles["nothing-found"]}>Nothing Found...</div>;
    }

    if (this.state.isSingleTrue) {
      singleOrNot = (
        <Single
          data={this.state.singleData}
          imgBaseUrl={this.imageBaseUrl}
          toggleSingle={this.toggleSingle}
          api={API__KEY}
        ></Single>
      );
    }

    if (!this.state.isSingleTrue) {
      singleOrNot = value;
    }

    return (
      <Fragment>
        <Header toggleSingle={this.toggleSingle} />
        <div className={styles.wrapper}>
          {!this.state.isLoaded ? (
            <Loader />
          ) : (
            <React.Fragment>{singleOrNot}</React.Fragment>
          )}
        </div>
        <Footer />
      </Fragment>
    );
  };
}

export default App;
