import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Favorite } from '../../store/models';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-people-card',
  templateUrl: 'people-card.component.html',
  styleUrls: ['search.component.css']
})

export class PeopleCardComponent implements OnInit, OnDestroy {
  @Input() actors;
  logged = false;
  favorites: Favorite[];
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe((state: fromUser.State) => {
        this.logged = state.logged;
        this.favorites = state.favorites;
      });
  }

  ngOnDestroy() {
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }
  }
}
