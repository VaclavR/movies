import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../store/auth/auth.reducers';
import * as AuthActions from '../../store/auth/auth.actions';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  logged = false;
  authSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.authSubscription = this.store.select('auth')
      .subscribe((store: fromAuth.State) => {
        this.logged = store.logged;
      });
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
