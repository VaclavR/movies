import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { User } from '../../store/user.model';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../store/auth/auth.reducers';
import * as fromUser from '../../store/user/user.reducers';
import * as UserActions from '../../store/user/user.actions';

@Component({
  selector: 'app-show-item',
  templateUrl: 'show-item.component.html',
  styleUrls: ['search-result.component.css']
})

export class ShowItemComponent implements OnInit, OnDestroy {
  @Input() show;
  logged = false;
  liked = false;
  userData: User;
  userId: string;
  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    console.log(this.show);
    this.authSubscription = this.store.select('auth')
      .subscribe((state: fromAuth.State) => {
        this.logged = state.logged;
        this.userId = state.userId;
      });
    if (this.logged) {
      this.userSubscription = this.store.select('user')
        .subscribe((state: fromUser.State) => {
          this.userData = state.userData;
          this.liked = this.userData.shows.indexOf(this.show.show.id) !== -1;
        });
    }
  }

  like(id: number) {
    this.store.dispatch(new UserActions.ToggleShowLike(id));
    this.store.dispatch(new UserActions.SaveUserData([this.userData, this.userId]));
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }
  }
}
