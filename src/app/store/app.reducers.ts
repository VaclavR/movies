import { ActionReducerMap } from '@ngrx/store';
import * as fromSearch from './search/search.reducers';

export interface AppState {
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<AppState> = {
  search: fromSearch.SearchReducer
};
