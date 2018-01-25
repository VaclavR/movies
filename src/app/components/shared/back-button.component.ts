import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromApp from '../../store/app.reducers';
import * as fromRouter from '../../store/router/router.reducers';
import * as RouterAction from '../../store/router/router.actions';

@Component({
  selector: 'app-back-button',
  template: `
    <button (click)="goBack()" class="btn btn-info">Back</button>
  `,
  styles: ['button { margin: 20px }']
})

export class BackButtonComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription;
  routes: string[];

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.routerSubscription = this.store.select('router')
      .subscribe((state: fromRouter.State) => {
        this.routes = state.routes;
        // console.log(this.routes[this.routes.length - 1]);
      });
  }

  goBack() {
    console.log('pocatectni stav', this.routes);
    this.store.dispatch(new RouterAction.GoBack());
    console.log('stav po dispatchi', this.routes);
    const route = this.routes[this.routes.length - 1];
    console.log('naviguj na', route);
    this.router.navigate([route]);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

}
