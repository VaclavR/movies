import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as fromAuth from '../../store/auth/auth.reducers';
import * as fromApp from '../../store/app.reducers';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user/user.actions';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-people-card',
  templateUrl: 'people-card.component.html',
  styleUrls: ['search-result.component.css']
})

export class PeopleCardComponent implements OnInit, OnDestroy {
  @Input() people;
  logged = false;
  liked = false;
  likedActors: Number[];
  authSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    console.log(this.people);
    this.authSubscription = this.store.select('auth')
      .subscribe((state: fromAuth.State) => {
        console.log(state.logged);
        this.logged = state.logged;
      });
    if (this.logged) {
      this.userSubscription = this.store.select('user')
        .subscribe((state: fromUser.State) => {
          this.likedActors = state.userData.actors;
          this.liked = this.likedActors.indexOf(this.people.person.id) !== -1;
        });
    }
  }

  like(id: number) {
    this.store.dispatch(new UserActions.TogglePersonLike(id));
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
