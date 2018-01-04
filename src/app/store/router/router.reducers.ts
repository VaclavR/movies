import * as RouterActions from './router.actions';

export interface State {
  currentRoute: string;
}

const initialState = {
  currentRoute: 'home'
};

export function RouterReducer(state = initialState, action: RouterActions.RouterActions) {
  switch (action.type) {
    case (RouterActions.SAVE_ACTIVE_ROUTE):
      return {
        ...state,
        currentRoute: action.payload
      };

    default:
      return state;
  }
}
