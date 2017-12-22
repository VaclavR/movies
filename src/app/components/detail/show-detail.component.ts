import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as fromSearch from '../../store/search/search.reducers';
import * as SearchActions from '../../store/search/search.actions';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit, OnDestroy {
  searchSubscription: Subscription;
  searchResult;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.store.dispatch(new SearchActions.FetchShowById(id));
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
        if (state.searchResult.length !== 0) {
          this.searchResult = state.searchResult;
        }
      });
  }

  reRoute(id) {
    this.router.navigate(['/results/person', id]);
  }

  ngOnDestroy() {
    this.searchResult = undefined;
    this.searchSubscription.unsubscribe();
  }

}
