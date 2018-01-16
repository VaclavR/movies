import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as fromSearch from '../../store/search/search.reducers';
import * as RouterAction from '../../store/router/router.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  searchKey: string;
  searchSubscription: Subscription;
  searchResults;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new RouterAction.SaveActiveRoute('results'));
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
        if (state.searchKey.length === 0) {
          this.router.navigate(['/']);
        }
        if (state.searchResults.length > 1) {
          if (state.searchResults[0].length === 0 && state.searchResults[0].length === 0) {
            this.searchKey = 'There are no results for the ' + state.searchKey;
            this.searchResults = undefined;
          } else {
            this.searchResults = state.searchResults;
            this.searchKey = 'Results for the ' + state.searchKey;
          }
        }
      });

  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
