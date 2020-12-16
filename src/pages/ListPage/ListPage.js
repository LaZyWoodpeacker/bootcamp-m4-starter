import React, { Component } from 'react';
import './ListPage.css';
import key from '../../store/key';

class ListPage extends Component {
    state = {
        title: '',
        movies: []
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch('https://acb-api.algoritmika.org/api/movies/list/' + id)
            .then(r => r.json())
            .then(json => {
                console.log(json);
                const title = json.title;
                const data = json.movies.map(id => {
                    return fetch(`http://www.omdbapi.com/?i=${id}&${key}`)
                        .then(r => r.json())
                })
                Promise.all(data).then(movies => {
                    this.setState({ movies, title })
                })
            })
    }
    render() {
        console.log(this.state.movies)
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={"https://www.imdb.com/title/" + item.imdbID} rel="noopener noreferrer" target="_blank">{item.Title} ({item.Year})</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;