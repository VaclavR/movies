import { Action } from '@ngrx/store';

export const SEARCH_SHOWS_BY_NAME = 'SEARCH_SHOWS_BY_NAME';
export const FETCH_SHOW_BY_ID = 'FETCH_SHOW_BY_ID';
export const FETCH_PERSON_BY_ID = 'FETCH_PERSON_BY_ID';
export const FETCH_EPISODE_BY_NUMBER = 'FETCH_EPISODE_BY_NUMBER';
export const SAVE_SEARCH_KEY = 'SAVE_SEARCH_KEY';
export const SAVE_RESULT = 'SAVE_RESULT';
export const SAVE_RESULTS = 'SAVE_RESULTS';

export class SearchShowByName implements Action {
  readonly type = SEARCH_SHOWS_BY_NAME;
  constructor(public payload: string) {}
}

export class FetchShowById implements Action {
  readonly type = FETCH_SHOW_BY_ID;
  constructor(public payload: number) {}
}

export class FetchPersonById implements Action {
  readonly type = FETCH_PERSON_BY_ID;
  constructor(public payload: number) {}
}

export class FetchEpisodeByNumber implements Action {
  readonly type = FETCH_EPISODE_BY_NUMBER;
  constructor(public payload: {showId: number, episode: {season: number, episode: number}}) {}
}

export class SaveSearchKey implements Action {
  readonly type = SAVE_SEARCH_KEY;
  constructor(public payload: string) {}
}

export class SaveResults implements Action {
  readonly type = SAVE_RESULTS;
  constructor(public payload: {}) {}
}

export class SaveResult implements Action {
  readonly type = SAVE_RESULT;
  constructor(public payload: {}) {}
}

export type SearchActions =
  SearchShowByName |
  FetchShowById |
  FetchPersonById |
  FetchEpisodeByNumber |
  SaveSearchKey |
  SaveResults |
  SaveResult;
