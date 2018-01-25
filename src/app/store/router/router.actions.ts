import { Action } from '@ngrx/store';

export const SAVE_ACTIVE_ROUTE = 'SAVE_ACTIVE_ROUTE';
export const GO_BACK = 'GO_BACK';

export class SaveActiveRoute implements Action {
  readonly type = SAVE_ACTIVE_ROUTE;
  constructor(public payload: string) {}
}

export class GoBack implements Action {
  readonly type = GO_BACK;
}

export type RouterActions = SaveActiveRoute | GoBack;
