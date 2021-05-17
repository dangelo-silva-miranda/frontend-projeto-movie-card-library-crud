import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';

class MovieDetails extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      status: 'loading',
      isMounted: false,
    };
  }

  updateState = (response) => {
    this.setState({
      movie: response,
      status: '',
      isMounted: true,
    });
  }

  componentDidMount = async () => {
    const { isMounted } = this.state;
    if (!isMounted) {
      const { match: { params: { id } } } = this.props;
      const response = await movieAPI.getMovie(id);
      this.updateState(response);
    }
  }

  componentWillUnmount = () => {
    this.setState({
      movie: {},
      status: 'loading',
      isMounted: false,
    });
  }

  render() {
    const {
      movie: { id, title, storyline, imagePath, genre, rating, subtitle },
      status,
    } = this.state;

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="movie-details">
        <p>{title}</p>
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <Link to="/">VOLTAR</Link>
        <Link to={ `/movies/${id}/edit` }>EDITAR</Link>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    storyline: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
    genre: PropTypes.string,
  }),
  status: PropTypes.string,
  isMounted: PropTypes.bool,
}.isRequired;

export default MovieDetails;
