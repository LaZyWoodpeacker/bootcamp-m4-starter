import { createStore } from 'redux';


const intalState = {
      searchlist: [],
      chartList: [],
      searchStr: 'Godfather',
      chartName: 'Новый список',
      savedState: null
}

function reducer(state = intalState, action) {
      switch (action.type) {
            case 'SEARCH_CHANGED':
                  return { ...state, searchStr: action.payload }
            case 'CART_NAME_CHANGED':
                  return { ...state, chartName: action.payload }
            case 'SEARCH_FILL':
                  return { ...state, searchlist: action.payload }
            case 'ADD_TO_CART':
                  return { ...state, chartList: [...state.chartList, action.payload] }
            case 'SAVE_STATE':
                  return { ...state, savedState: action.payload }
            case 'REMOVE_FROM_CART':
                  return {
                        ...state, chartList: state.chartList.filter(e => {
                              return e.imdbID !== action.payload
                        })
                  }
            default: return state;
      }
}

let store = createStore(reducer);

export default store;