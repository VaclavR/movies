import * as RouterActions from './router.actions';

export interface State {
  currentRoute: string;
  routes: string[];
}

const initialState = {
  currentRoute: '/',
  routes: ['/']
};

export function RouterReducer(state = initialState, action: RouterActions.RouterActions) {
  switch (action.type) {
    case (RouterActions.SAVE_ACTIVE_ROUTE):
      if (action.payload === '/') {
        state.routes = ['/'];
      } else if (action.payload !== state.routes[state.routes.length - 1]) {
        state.routes.push(action.payload);
      }
      return {
        ...state,
        currentRoute: action.payload
      };

    case (RouterActions.GO_BACK):
      state.routes.splice(state.routes.length - 1, 1);
      return {
        ...state
      };

    default:
      return state;
  }
}
