import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import * as SearchActions from './search.actions';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class SearchEffects {
  url = 'http://api.tvmaze.com/';
  payload;

  @Effect()
  searchShowByName = this.actions$
    .ofType(SearchActions.SEARCH_SHOWS_BY_NAME)
    .switchMap((action: SearchActions.SearchShowByName) => {
      this.payload = action.payload;
      return this.http.get(this.url + 'search/shows?q=' + this.payload);
    })
    .mergeMap((event1) => {
      return this.http.get(this.url + 'search/people?q=' + this.payload)
        .map((event2) => {
          return {
            type: SearchActions.SAVE_RESULTS,
            payload: [event1, event2]
          };
        })
    });

  @Effect()
  fetchShowById = this.actions$
    .ofType(SearchActions.FETCH_SHOW_BY_ID)
    .switchMap((action: SearchActions.FetchShowById) => {
      this.payload = action.payload;
      return this.http.get(this.url + 'shows/' + this.payload);
    })
    .mergeMap((event1) => {
      return this.http.get(this.url + 'shows/' + this.payload + '/cast')
        .map((event2) => {
          return [event1, event2];
        })
    })
    .mergeMap((event1) => {
      return this.http.get(this.url + 'shows/' + this.payload + '/episodes')
        .map((event2) => {
          const allEvents = event1;
          event1.push(event2);
          return {
            type: SearchActions.SAVE_RESULT,
            payload: allEvents
          };
        });
    });

  @Effect()
  fetchPersonById = this.actions$
    .ofType(SearchActions.FETCH_PERSON_BY_ID)
    .switchMap((action: SearchActions.FetchPersonById) => {
      this.payload = action.payload;
      return this.http.get(this.url + 'people/' + this.payload);
    })
    .mergeMap((event1) => {
      return this.http.get(this.url + 'people/' + this.payload + '/castcredits?embed=show')
        .map((event2) => {
          return {
            type: SearchActions.SAVE_RESULT,
            payload: [event1, event2]
          }
        })
    });

  @Effect()
  fetchEpisodeByNumber = this.actions$
    .ofType(SearchActions.FETCH_EPISODE_BY_NUMBER)
    .switchMap((action: SearchActions.FetchEpisodeByNumber) => {
      return this.http.get(
        this.url + 'shows/' + action.payload.showId + '/episodebynumber?season='
        + action.payload.episode.season + '&number=' + action.payload.episode.episode)
    })
    .map((event) => {
      return {
        type: SearchActions.SAVE_RESULT,
        payload: event
      }
    });

  constructor(private actions$: Actions,
              private http: HttpClient) {}
}
