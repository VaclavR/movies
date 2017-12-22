import * as SearchActions from './search.actions';

export interface State {
  carouselItems: any[];
  searchKey: string;
  searchResults;
  searchResult;
}

const initialState = {
  carouselItems: ['1', '2', '3'],
  searchKey: '',
  searchResults: [],
  searchResult: []
};

export function SearchReducer(state = initialState, action: SearchActions.SearchActions) {
  switch (action.type) {

    case (SearchActions.SAVE_SEARCH_KEY):
      return {
        ...state,
        searchKey: action.payload
      };

    case (SearchActions.SAVE_RESULTS):
      return {
        ...state,
        searchResults: action.payload
      };

    case (SearchActions.SAVE_RESULT):
      return {
        ...state,
        searchResult: action.payload
      };

    default:
      return state;
  }
}
