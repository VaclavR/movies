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
export class EpisodeDetailComponent implements OnInit, OnDestroy {
  searchSubscription: Subscription;
  searchResult;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    const season = +this.route.snapshot.params['season'];
    const episode = +this.route.snapshot.params['episode'];
    this.store.dispatch(new SearchActions.FetchEpisodeByNumber({showId: id, episode: {season: season, episode: episode}}));
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
        if (state.searchResult.length !== 0) {
          this.searchResult = state.searchResult;
          console.log(this.searchResult);
        }
      });
  }

  ngOnDestroy() {
    this.searchResult = undefined;
    this.searchSubscription.unsubscribe();
  }

}
