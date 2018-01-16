import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as RouterAction from '../../store/router/router.actions';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  logged = false;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe((store: fromUser.State) => {
        this.logged = store.logged;
      });
    this.store.dispatch(new RouterAction.SaveActiveRoute('home'));
  }

  ngOnDestroy() {
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }
  }

}
