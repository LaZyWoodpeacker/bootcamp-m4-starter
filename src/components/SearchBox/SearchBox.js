import React, { Component } from 'react';
import './SearchBox.css';
import { connect } from 'react-redux';
import key from '../../store/key';


class SearchBox extends Component {
    searchLineChangeHandler = (e) => {
        this.props.dispatch({ type: 'SEARCH_CHANGED', payload: e.target.value })
    }
    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        console.log(`http://www.omdbapi.com/?s=${this.props.searchLine}&${key}`)
        fetch(`http://www.omdbapi.com/?s=${this.props.searchLine}&${key}`)
            .then(r => r.json())
            .then(e => {
                this.props.dispatch({ type: 'SEARCH_FILL', payload: e.Search })
            })
            .catch(e => { debugger });
    }
    render() {
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={this.props.searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!this.props.searchLine}
                    >
                        Искать
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(state => ({ searchLine: state.searchStr }), null)(SearchBox);
