import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const TOGGLE_SHOW_LIKE = 'TOGGLE_SHOW_LIKE';
export const TOGGLE_PERSON_LIKE = 'TOGGLE_PERSON_LIKE';
export const FETCH_USER_DATA = 'FETCH_USER_DATA';
export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const EXPERIMENT = 'EXPERIMENT';

export class ToggleShowLike implements Action {
  readonly type = TOGGLE_SHOW_LIKE;
  constructor(public payload: number) {}
}

export class TogglePersonLike implements Action {
  readonly type = TOGGLE_PERSON_LIKE;
  constructor(public payload: number) {}
}

export class FetchUserData implements Action {
  readonly type = FETCH_USER_DATA;
  constructor(public payload: {}) {}
}

export class SaveUserData implements Action {
  readonly type = SAVE_USER_DATA;
  constructor(public payload: [User, string]) {}
}

export class Experiment implements Action {
  readonly type = EXPERIMENT;
  constructor(public payload: number) {}
}

export type UserActions =
  ToggleShowLike |
  TogglePersonLike |
  FetchUserData |
  SaveUserData |
  Experiment;

