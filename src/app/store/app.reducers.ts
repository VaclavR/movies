import { ActionReducerMap } from '@ngrx/store';
import * as fromSearch from './search/search.reducers';
import * as fromAuth from './auth/auth.reducers';
import * as fromRouter from './router/router.reducers';
import * as fromUser from './user/user.reducers';

export interface AppState {
  search: fromSearch.State;
  auth: fromAuth.State;
  router: fromRouter.State;
  user: fromUser.State;
}

export const reducers: ActionReducerMap<AppState> = {
  search: fromSearch.SearchReducer,
  auth: fromAuth.AuthReducer,
  router: fromRouter.RouterReducer,
  user: fromUser.UserReducer
};
