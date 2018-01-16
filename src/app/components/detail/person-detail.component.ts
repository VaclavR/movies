import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as fromSearch from '../../store/search/search.reducers';
import * as RouterAction from '../../store/router/router.actions';
import * as SearchActions from '../../store/search/search.actions';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class PersonDetailComponent implements OnInit, OnDestroy {
  searchSubscription: Subscription;
  userSubscription: Subscription;
  searchResult;
  logged = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.store.dispatch(new RouterAction.SaveActiveRoute('results/person/' + id));
    this.store.dispatch(new SearchActions.FetchPersonById(id));
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
        if (state.searchResult.length !== 0) {
          this.searchResult = state.searchResult;
        }
      });
    this.userSubscription = this.store.select('user')
      .subscribe((state: fromUser.State) => {
        this.logged = state.logged;
      });
  }

  reRoute(id) {
    this.router.navigate(['/results/show', id]);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
