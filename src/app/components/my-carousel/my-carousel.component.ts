import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromSearch from '../../store/search/search.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-my-carousel',
  templateUrl: './my-carousel.component.html',
  styleUrls: ['./my-carousel.component.css']
})
export class MyCarouselComponent implements OnInit, OnDestroy {
  carouselItems: any[];
  searchSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.searchSubscription = this.store.select('search')
      .subscribe((state: fromSearch.State) => {
          this.carouselItems = state.carouselItems;
      });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

}
