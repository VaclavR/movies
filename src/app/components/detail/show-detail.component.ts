import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as fromSearch from '../../store/search/search.reducers';
import * as RouterAction from '../../store/router/router.actions';
import * as SearchActions from '../../store/search/search.actions';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class ShowDetailComponent implements OnInit, OnDestroy {
  searchSubscription: Subscription;
  searchResult;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.store.dispatch(new RouterAction.SaveActiveRoute('results/show/' + this.id));
    this.store.dispatch(new SearchActions.FetchShowById(this.id));
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
        if (state.searchResult.length !== 0) {
          this.searchResult = state.searchResult;
        }
      });
  }

  reRouteToPerson(id) {
    this.router.navigate(['/results/person', id]);
  }

  reRouteToEpisode({season, episode}) {
    this.router.navigate(['/results/show', this.id, season, episode]);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
