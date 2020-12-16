import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Favorites.css';


class Favorites extends Component {
    chartNameChanged(e) {
        this.props.dispatch({ type: 'CART_NAME_CHANGED', payload: e.target.value });
    }

    render() {
        return (
            <div className="favorites">
                <input value={this.props.title} className="favorites__name" onChange={e => this.chartNameChanged(e)} />
                <ul className="favorites__list">
                    {this.props.movies.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year}) <span onClick={e => {
                            this.props.dispatch({ type: 'REMOVE_FROM_CART', payload: item.imdbID })
                        }} className="favorites__del">&#9746;</span></li>;
                    })}
                </ul>
                {
                    !this.props.savedState && <button type="button" className="favorites__save" onClick={e => {
                        if (this.props.movies.length) {
                            const btn = e.target;
                            btn.disabled = true;
                            fetch('https://acb-api.algoritmika.org/api/movies/list', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    title: this.props.title,
                                    movies: this.props.movies.map(film => film.imdbID)
                                })
                            }).then(e => e.json())
                                .then(json => {
                                    this.props.dispatch({ type: 'SAVE_STATE', payload: json.id })
                                })
                                .finally(() => { btn.disabled = false });
                        }
                    }}>Сохранить список</button>
                }
                { this.props.savedState && <a href={'http://localhost:3000/list/' + this.props.savedState}>{this.props.savedState}</a>}
            </div >
        );
    }
}

export default connect(state => ({ movies: state.chartList, title: state.chartName, savedState: state.savedState }))(Favorites);