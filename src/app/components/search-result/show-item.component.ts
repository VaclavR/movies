import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-show-item',
  templateUrl: 'show-item.component.html',
  styleUrls: ['search.component.css']
})

export class ShowItemComponent implements OnInit, OnDestroy {
  @Input() show;
  logged = false;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe((state: fromUser.State) => {
        this.logged = state.logged;
      });
  }

  ngOnDestroy() {
    if (this.userSubscription !== undefined) {
      this.userSubscription.unsubscribe();
    }
  }
}
