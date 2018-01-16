import { ActionReducerMap } from '@ngrx/store';
import * as fromSearch from './search/search.reducers';
import * as fromRouter from './router/router.reducers';
import * as fromUser from './user/user.reducers';

export interface AppState {
  search: fromSearch.State;
  router: fromRouter.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  search: fromSearch.SearchReducer,
  router: fromRouter.RouterReducer,
  user: fromUser.UserReducer
};
