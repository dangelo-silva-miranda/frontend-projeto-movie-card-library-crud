import React, { Component } from 'react';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loaded: false,
    };
  }

  getMovies = async () => {
    const response = await movieAPI.getMovies();
    return response;
  }

  updateState = (response) => {
    this.setState({
      movies: response,
      loaded: true,
    });
  }

  componentDidMount = async () => {
    const response = await this.getMovies();
    this.updateState(response);
  }

  render() {
    const { movies, loaded } = this.state;

    if (!loaded) {
      return <Loading />;
    }

    return (
      <div data-testid="movie-list">
        <p>MovieList</p>
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>
    );
  }
}

export default MovieList;
