import { Action } from '@ngrx/store';

export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN = 'LOGIN';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const GET_USER_ID_AND_TOKEN = 'GET_USER_ID_AND_TOKEN';
export const AUTH_FAILED = 'AUTH_FAILED';
export const LOGOUT = 'LOGOUT';

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: string) {}
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: {email: string, password: string}) {}
}

export class GetUserIdAndToken implements Action {
  readonly type = GET_USER_ID_AND_TOKEN;
  constructor(public payload: any) {}
}

export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions =
  TryLogin |
  Login |
  TrySignup |
  GetUserIdAndToken |
  AuthFailed |
  Logout;
