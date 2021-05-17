import React, { Component } from 'react';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      status: 'loading',
    };
  }

  updateState = (response) => {
    this.setState({
      movies: response,
      status: '',
    });
  }

  componentDidMount = async () => {
    const response = await movieAPI.getMovies();
    this.updateState(response);
  }

  render() {
    const { movies, status } = this.state;

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="movie-list">
        {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
      </div>
    );
  }
}

export default MovieList;
