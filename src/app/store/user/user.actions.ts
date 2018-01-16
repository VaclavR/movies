import { Action } from '@ngrx/store';
import { Favorite } from '../models';

export const TOGGLE_LIKE = 'TOGGLE_SHOW_LIKE';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const UPLOAD_USER_DATA = 'UPLOAD_USER_DATA';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const LOGOUT = 'LOGOUT';

export class ToggleLike implements Action {
  readonly type = TOGGLE_LIKE;
  constructor(public payload: Favorite) {}
}

export class FetchUserData implements Action {
  readonly type = FETCH_USER_DATA;
}

export class UploadUserData implements Action {
  readonly type = UPLOAD_USER_DATA;
  constructor(public payload: any) {}
}

export class SaveUserData implements Action {
  readonly type = SAVE_USER_DATA;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type UserActions =
  ToggleLike |
  FetchUserData |
  UploadUserData |
  SaveUserData |
  Logout;
