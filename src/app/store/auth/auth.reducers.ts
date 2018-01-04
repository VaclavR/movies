import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  userId: string;
  logged: boolean;
}

const initialState = {
  token: '',
  userId: '',
  logged: false
};

export function AuthReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {

    case (AuthActions.LOGIN):
      console.log('Logged!', action.payload);
      return {
        ...state,
        logged: true,
        userId: action.payload[0].replace('@', '').replace('.', ''),
        token: action.payload[1],
      };

    case (AuthActions.AUTH_FAILED):
      console.log('AuthFailed', action.payload.message);

      return {
        ...state,
        token: '',
        logged: false
      };

    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: '',
        logged: false
      };

    default:
      return state;
  }
}
