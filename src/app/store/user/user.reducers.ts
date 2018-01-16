import * as UserActions from './user.actions';
import { Favorite } from '../models';

export interface State {
  favorites: Favorite[];
  userId: string;
  logged: boolean;
}

const initialState = {
  favorites: [],
  userId: '',
  logged: false
};

export function UserReducer(state = initialState, action: UserActions.UserActions) {
  switch (action.type) {

    case (UserActions.TOGGLE_LIKE):
      const index = state.favorites.findIndex((favorite: Favorite) => {
        return favorite.id === action.payload.id && favorite.type === action.payload.type;
      });
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
      return {
        ...state
      };


    case(UserActions.SAVE_USER_DATA):
      console.log(action.payload);
      if (action.payload[1] !== null) {
        state.favorites = action.payload[1];
      }
      return {
        ...state,
        userId: action.payload[0],
        logged: true
      };

    case(UserActions.LOGOUT):
      return {
        ...state,
        favorites: [],
        userId: '',
        logged: false
      };

    default:
      return state;
  }
}
