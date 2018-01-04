import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './store/search/search.effects';
import { AuthEffects } from './store/auth/auth.effects';
import { reducers } from './store/app.reducers';
import { UserEffects } from './store/user/user.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SearchEffects, AuthEffects, UserEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
