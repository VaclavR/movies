import { Action } from '@ngrx/store';

export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const SET_TOKEN = 'SET_TOKEN';
export const AUTH_FAILED = 'AUTH_FAILED';

export class TryLogin implements Action {
  readonly type = TRY_LOGIN;
  constructor(public payload: {email: string, password: string}) {}
}

export class Login implements Action {
  readonly type = LOGIN;
}

export class GetToken implements Action {
  readonly type = GET_TOKEN;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class AuthFailed implements Action {
  readonly type = AUTH_FAILED;
  constructor(public payload: any) {}
}


export type AuthActions =
  TryLogin |
  Login |
  GetToken |
  SetToken |
  AuthFailed;
