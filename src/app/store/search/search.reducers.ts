import * as SearchActions from './search.actions';

export interface State {
  carouselItems: any[];
  searchKey: string;
  searchResults;
  searchResult;
}

const initialState = {
  carouselItems: [
    { name: 'The Big Bang Theory', img: 'assets/carousel/bigbang.jpeg', desc: 'sitcom' },
    { name: 'Dirk Gently\'s Holistic Detective Agency', img: 'assets/carousel/dirkgently.jpeg', desc: 'sitcom' },
    { name: 'The Orville', img: 'assets/carousel/orville.jpeg', desc: 'sitcom' },
    { name: 'Red Dwarf', img: 'assets/carousel/reddwarf.jpeg', desc: 'sitcom' },
    { name: 'The Young Sheldon', img: 'assets/carousel/youngsheldon.jpeg', desc: 'sitcom' }
  ],
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
