import { ActionReducerMap } from '@ngrx/store';
import * as fromSearch from './search/search.reducers';
import * as fromAuth from './auth/auth.reducers';

export interface AppState {
  search: fromSearch.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  search: fromSearch.SearchReducer,
  auth: fromAuth.AuthReducer
};
