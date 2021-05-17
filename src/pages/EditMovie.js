import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { MovieForm, Loading } from '../components';

import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      status: 'loading',
      isMounted: false,
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('componentDidUpdate', this.state, prevState);
  // }

  async handleSubmit(updatedMovie) {
    // console.log('handleSubmit');
    await movieAPI.updateMovie(updatedMovie);

    this.setState(
      (prevState) => ({
        movie: { ...prevState.movie, updatedMovie },
        status: '',
        isMounted: false,
        shouldRedirect: true,
      }),
    );
  }

  updateState = (response) => {
    // console.log('updateState');
    this.setState({
      movie: response,
      status: '',
      isMounted: true,
      shouldRedirect: false,
    });
  }

  componentDidMount = async () => {
    // console.log('componentDidMount');
    const { isMounted } = this.state;
    // console.log(`componentDidMount-isMounted: ${isMounted}`);
    if (!isMounted) {
      const { match: { params: { id } } } = this.props;
      const response = await movieAPI.getMovie(id);
      this.updateState(response);
    }
  }

  componentWillUnmount = () => {
    // console.log('componentWillUnmount');
    this.setState({
      movie: {},
      status: 'loading',
      isMounted: false,
      shouldRedirect: false,
    });
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/" />;
    }

    if (status === 'loading') {
      return <Loading />;
    }

    return (
      <div data-testid="edit-movie">
        <p>EditMovie</p>
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
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

export default EditMovie;
