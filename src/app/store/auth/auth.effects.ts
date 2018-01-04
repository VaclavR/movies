import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';
import * as fromRouter from '../router/router.reducers';
import * as fromApp from '../app.reducers';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AuthEffects {
  credentials: {email: string, password: string};
  routerSubscription: Subscription;
  currentRoute: string;

  @Effect()
  tryLogin = this.actions$
    .ofType(AuthActions.TRY_LOGIN)
    .map((action: AuthActions.TryLogin) => {
      return action.payload;
    })
    .mergeMap((credentials: {email: string, password: string}) => {
      this.credentials = credentials;
      return fromPromise(
         firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password))
          .map(() => {
            this.router.navigate([this.currentRoute]);
            return {type: AuthActions.GET_USER_ID_AND_TOKEN};
          })
          .catch((error) => {
              if (error.code === 'auth/user-not-found') {
                const question = confirm('Account ' + credentials.email + ' doesn\'t exist. Do you want to create it?');
                if (question) {
                  return of(
                    {type: AuthActions.TRY_SIGNUP, payload: credentials}
                  );
                } else {
                  return of(
                    {type: AuthActions.AUTH_FAILED, payload: error}
                  );
                }
              } else {
                return of(
                  {type: AuthActions.AUTH_FAILED, payload: error}
                );
              }
            }
          );
    });

  @Effect()
  trySignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .mergeMap((credentials: {email: string, password: string}) => {
      return fromPromise(
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password))
        .map(() => {
          this.router.navigate([this.currentRoute]);
          return {type: AuthActions.GET_USER_ID_AND_TOKEN};
        })
        .catch((error) => of({type: AuthActions.AUTH_FAILED, payload: error}));
    });

  @Effect()
  getUserIdAndToken = this.actions$
    .ofType(AuthActions.GET_USER_ID_AND_TOKEN)
    .map((action: AuthActions.GetUserIdAndToken) => {
      return firebase.auth().currentUser.providerData[0]['email'];
    })
    .mergeMap((userEmail) => {
      return fromPromise(
        firebase.auth().currentUser.getIdToken())
        .map((token: string) => {
          return {type: AuthActions.LOGIN, payload: [userEmail, token]};
        })
        .catch((error) => of(
          {type: AuthActions.AUTH_FAILED, payload: error}
        ));
    });

  constructor(private actions$: Actions, private router: Router, private store: Store<fromApp.AppState>) {
    this.routerSubscription = this.store.select('router')
      .subscribe((state: fromRouter.State) => {
        this.currentRoute = state.currentRoute;
    });
  }
}
