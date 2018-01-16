import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Favorite } from '../../store/models';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  favorites: Favorite[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe((state: fromUser.State) => {
        this.favorites = state.favorites;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
