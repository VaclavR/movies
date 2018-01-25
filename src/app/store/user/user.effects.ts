import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Favorite } from '../models';
import * as firebase from 'firebase';
import * as UserActions from './user.actions';
import * as fromApp from '../app.reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class UserEffects {
  url = 'http://api.tvmaze.com/';
  userId: string;

  @Effect({ dispatch: true })
  uploadUserData = this.actions$
    .ofType(UserActions.UPLOAD_USER_DATA)
    .map((action: UserActions.UploadUserData) => {
      if (!action.payload) {
        console.log('no payload!');
        this.userId = firebase.auth().currentUser.uid;
        return [new Favorite(0, '', '')];
      } else {
        return action.payload;
      }
    })
    .switchMap((userData) => {
      return firebase.database().ref('users/' + this.userId)
        .set(userData)
        .then(() => {
          return {
            type: UserActions.SAVE_USER_DATA,
            payload: [this.userId, userData]
          };
        })
        .catch((error) => {
          console.log(error);
        });
    });

  @Effect({ dispatch: true })
  fetchUserData = this.actions$
    .ofType(UserActions.FETCH_USER_DATA)
    .switchMap((action: UserActions.FetchUserData) => {
      this.userId = firebase.auth().currentUser.uid;
      const database = firebase.database();
      return fromPromise(database.ref('users/' + this.userId).once('value'))
        .map(
          (snapshot) => {
          return snapshot.val();
        })
        .catch((error) => {
        console.log(error);
        return error;
      });
    })
    .map((userData) => {
      return {
         type: UserActions.SAVE_USER_DATA,
         payload: [this.userId, userData]
      };
    });

  constructor(private actions$: Actions,
              private store: Store<fromApp.AppState>,
              private http: HttpClient) {}
}
