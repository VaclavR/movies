import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Favorite } from '../../store/models';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../store/user/user.actions';
import { Subscription } from 'rxjs/Subscription';
import * as fromUser from '../../store/user/user.reducers';

@Component({
  selector: 'app-like-button',
  template: `
    <a><i [ngClass]="[liked ? 'fa-heart' : 'fa-heart-o']"
       (click)="onClick()"
       class="fa text-danger" aria-hidden="true">
    </i></a>`
})

export class LikeButtonComponent implements OnInit {
  @Input() likeData;
  liked = false;
  favorites: Favorite[];
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store.select('user')
      .subscribe((state: fromUser.State) => {
        this.favorites = state.favorites;
        const index = this.favorites.findIndex((favorite: Favorite) => {
          return favorite.id === this.likeData.id;
        });
        this.liked = index !== -1;
        // if (index !== -1) {
        //   this.liked = true;
        // } else {
        //   this.liked = false;
        // }
      });
  }

  onClick() {
      this.store.dispatch(new UserActions.ToggleLike(this.likeData));
      this.store.dispatch(new UserActions.UploadUserData(this.favorites));
  }
}
