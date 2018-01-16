import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';
import * as UserActions from '../user/user.actions';
import * as AuthActions from './auth.actions';
import * as fromRouter from '../router/router.reducers';
import * as fromApp from '../app.reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthEffects {
  routerSubscription: Subscription;
  currentRoute: string;

  @Effect()
  tryLogin = this.actions$
    .ofType(AuthActions.TRY_LOGIN)
    .map((action: AuthActions.TryLogin) => {
      return action.payload;
    })
    .mergeMap((credentials: {email: string, password: string}) => {
      return fromPromise(
         firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password))
          .map(() => {
            this.router.navigate([this.currentRoute]);
            return {type: UserActions.FETCH_USER_DATA};
          })
          .catch((error) => {
              if (error.code === 'auth/user-not-found') {
                const question = confirm('Account ' + credentials.email +
                  ' doesn\'t exist. Do you want to create it?');
                if (question) {
                  return of(
                    {type: AuthActions.TRY_SIGNUP, payload: credentials}
                  );
                } else {
                  console.log(error);
                  return of({
                    type: UserActions.LOGOUT
                  });
                }
              } else {
                console.log(error);
                return of({
                  type: UserActions.LOGOUT
                });
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
          return {type: UserActions.UPLOAD_USER_DATA};
        })
        .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          const question = confirm('Account ' + credentials.email +
            ' ís already in use, do you want to try login with the same password?');
          if (question) {
            console.log(question);
            return of(
              {type: AuthActions.TRY_LOGIN, payload: credentials}
            );
          } else {
            console.log(question, error);
            return of({
              type: UserActions.LOGOUT
            });
          }
        } else {
          console.log(error);
          return of({
            type: UserActions.LOGOUT
          });
        }
      });
    });


  constructor(private actions$: Actions, private router: Router, private store: Store<fromApp.AppState>) {
    this.routerSubscription = this.store.select('router')
      .subscribe((state: fromRouter.State) => {
        this.currentRoute = state.currentRoute;
    });
  }
}
