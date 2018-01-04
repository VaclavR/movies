import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as UserActions from './user.actions';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { User } from '../user.model';

@Injectable()
export class UserEffects {

  @Effect({ dispatch: false })
  saveUserData = this.actions$
    .ofType(UserActions.SAVE_USER_DATA)
    .map((action: UserActions.SaveUserData) => {
      return action.payload;
    })
    .switchMap((userData: [User, string]) => {
      return firebase.database().ref('users/' + userData[1])
        .set(userData[0]);
    });

  constructor(private actions$: Actions) {}
}
