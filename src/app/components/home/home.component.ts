import { Component, OnInit } from '@angular/core';
import * as RouterAction from '../../store/router/router.actions';
import * as fromApp from '../../store/app.reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new RouterAction.SaveActiveRoute('home'));
  }

}
