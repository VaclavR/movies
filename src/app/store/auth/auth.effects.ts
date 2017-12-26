import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {
  @Effect()
  tryLogin = this.actions$
    .ofType(AuthActions.TRY_LOGIN)
    .map((action: AuthActions.TryLogin) => {
      return action.payload;
    })
    .mergeMap((credentials: {email: string, password: string}) => {
      return fromPromise(
         firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password))
          .map(() => ({type: AuthActions.LOGIN}))
          .catch((error) => of({type: AuthActions.AUTH_FAILED, payload: error}));
    });
    // .mergeMap((token: string) => {
    //   console.log(token);
    //   return [
    //     {
    //       type: AuthActions.LOGIN
    //     },
    //     {
    //       type: AuthActions.SET_TOKEN,
    //       payload: token
    //     }
    //   ];
    // }).catch(err => {
    //   return Observable.of({ type: AuthActions.AUTH_FAILED, payload: err });
    // });

  constructor(private actions$: Actions) {}
}
