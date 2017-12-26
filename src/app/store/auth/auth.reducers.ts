import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  logged: boolean;
}

const initialState = {
  token: '',
  logged: false
};

export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {

    case (AuthActions.LOGIN):
      console.log('Logged!');
      return {
        ...state,
        logged: true
      };

    case (AuthActions.SET_TOKEN):
      console.log('Token!');
      return {
        ...state,
        token: action.payload
      };

    case (AuthActions.AUTH_FAILED):
      console.log('Error!!!', action.payload);
      return {
        ...state,
        token: '',
        logged: false
      };

    default:
      return state;
  }
}
