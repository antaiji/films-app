import React, { Component } from "react";
import Loader from "../helpers/Loader";

import styles from "./Single.module.css";

class Single extends Component {
  state = {
    movieData: {},
    isLoaded: false,
  };

  handleToggle = () => {
    this.props.toggleSingle({}, false);
  };

  componentDidMount() {
    const url = `https://api.themoviedb.org/3/movie/${this.props.data.id}?api_key=${this.props.api}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ movieData: response });
        this.setState({ isLoaded: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.isLoaded ? (
          <Loader />
        ) : (
          <div className={styles["movie-info"]}>
            <div
              className={styles["movie-info__back"]}
              onClick={this.handleToggle}
            >
              &#10092; Back to Movies list &#10092;
            </div>
            <div className={styles["movie-info__title"]}>
              {this.state.movieData.title}
            </div>
            <div className={styles["movie-info__tagline"]}>
              {this.state.movieData.tagline}
            </div>
            <div className={styles["movie-info__img-container"]}>
              <a href={this.state.movieData.homepage}>
                <img
                  className={styles["movie-info__img"]}
                  src={this.props.imgBaseUrl + this.state.movieData.poster_path}
                  width="300"
                  alt="movie poster"
                />
              </a>
            </div>
            <div className={styles["movie-info__synopsis"]}>
              <div className={styles["movie-info__synopsis-info"]}>
                {this.state.movieData.overview}
              </div>
              <div className={styles["movie-info__details"]}>
                <ul>
                  <li>
                    <a
                      href={
                        "https://www.imdb.com/title/" +
                        this.state.movieData.imdb_id
                      }
                    >
                      IMDB link
                    </a>
                  </li>
                  <li>Movie Budget: {this.state.movieData.budget}</li>
                  <li>Movie Revenue: {this.state.movieData.revenue}</li>
                  <li>Release Date: {this.state.movieData.release_date}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Single;
