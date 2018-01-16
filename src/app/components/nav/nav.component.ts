import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../store/user/user.reducers';
import * as UserActions from '../../store/user/user.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  logged = false;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe((store: fromUser.State) => {
        this.logged = store.logged;
      });
  }

  logout() {
    this.store.dispatch(new UserActions.Logout());
  }

  ngOnDestroy() {
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }
  }

}
