import { Action } from '@ngrx/store';

export const SAVE_ACTIVE_ROUTE = 'SAVE_ACTIVE_ROUTE';

export class SaveActiveRoute implements Action {
  readonly type = SAVE_ACTIVE_ROUTE;
  constructor(public payload: string) {}
}

export type RouterActions = SaveActiveRoute;
