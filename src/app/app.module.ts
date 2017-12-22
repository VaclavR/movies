import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ShowDetailComponent } from './components/detail/show-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { NavComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search/search.effects';
import { PersonDetailComponent } from './components/detail/person-detail.component';
import { EpisodeDetailComponent } from './components/detail/episode-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    FavoritesComponent,
    ShowDetailComponent,
    PersonDetailComponent,
    EpisodeDetailComponent,
    SearchResultComponent,
    SearchFieldComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SearchEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
