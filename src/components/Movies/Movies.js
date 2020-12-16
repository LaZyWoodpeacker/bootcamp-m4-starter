import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import { connect } from 'react-redux'

class Movies extends Component {
    render() {
        return (
            <ul className="movies">
                { this.props.movies && this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} Click={e => {
                            if (!this.props.chart.find(e => e.imdbID === movie.imdbID)) {
                                this.props.dispatch({ type: 'ADD_TO_CART', payload: movie })
                            }
                        }} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default connect(state => ({ movies: state.searchlist, chart: state.chartList }))(Movies);