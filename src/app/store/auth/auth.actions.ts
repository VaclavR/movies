import { Action } from '@ngrx/store';

export const TRY_LOGIN = 'TRY_LOGIN';
export const TRY_SIGNUP = 'TRY_SIGNUP';

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {email: string, password: string}) {}
}

export type AuthActions =
  TryLogin |
  TrySignup;
