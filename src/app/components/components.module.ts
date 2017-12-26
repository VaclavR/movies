import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { CarouselModule } from 'ngx-bootstrap';

import { EpisodeDetailComponent } from './detail/episode-detail.component';
import { PersonDetailComponent } from './detail/person-detail.component';
import { ShowDetailComponent } from './detail/show-detail.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomeComponent } from './home/home.component';
import { MyCarouselComponent } from './my-carousel/my-carousel.component';
import { NavComponent } from './nav/nav.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CarouselModule
  ],
  declarations: [
    EpisodeDetailComponent,
    PersonDetailComponent,
    ShowDetailComponent,
    FavoritesComponent,
    HomeComponent,
    MyCarouselComponent,
    NavComponent,
    SearchFieldComponent,
    SearchResultComponent,
    FormComponent
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    EpisodeDetailComponent,
    PersonDetailComponent,
    ShowDetailComponent,
    FavoritesComponent,
    HomeComponent,
    MyCarouselComponent,
    NavComponent,
    SearchFieldComponent,
    SearchResultComponent,
    FormComponent
  ]
})

export class ComponentsModule {}
