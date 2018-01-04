import * as UserActions from './user.actions';
import { User } from '../user.model';

export interface State {
  userData: User;
  userId: string;
}

const initialState = {
  userData: new User([], []),
  userId: ''
};

export function UserReducer(state = initialState, action: UserActions.UserActions) {
  let index = 0;
  switch (action.type) {

    case (UserActions.TOGGLE_SHOW_LIKE):
      index = state.userData.shows.indexOf(action.payload);
      if (index !== -1) {
        state.userData.shows.splice(index, 1);
      } else {
        state.userData.shows.push(action.payload);
      }
      return {
        ...state
      };

    case(UserActions.TOGGLE_PERSON_LIKE):
      index = state.userData.actors.indexOf(action.payload);
      if (index !== -1) {
        state.userData.actors.splice(index, 1);
      } else {
        state.userData.actors.push(action.payload);
      }
      return {
        ...state
      };

    case(UserActions.EXPERIMENT):
      console.log(action.payload);
      return state;

    default:
      return state;
  }
}
