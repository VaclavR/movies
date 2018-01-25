import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as fromSearch from '../../store/search/search.reducers';
import * as RouterAction from '../../store/router/router.actions';
import * as SearchActions from '../../store/search/search.actions';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class EpisodeDetailComponent implements OnInit, OnDestroy {
  searchSubscription: Subscription;
  searchResult;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    const season = +this.route.snapshot.params['season'];
    const episode = +this.route.snapshot.params['episode'];
    this.store.dispatch(new RouterAction.SaveActiveRoute('results/show/' + this.id + '/' + season + '/' + episode));
    this.store.dispatch(new SearchActions.
      FetchEpisodeByNumber({showId: this.id, episode: {season: season, episode: episode}}));
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
        if (state.searchResult.length !== 0) {
          this.searchResult = state.searchResult;
        }
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
