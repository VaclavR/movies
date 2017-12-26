import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ShowDetailComponent } from './components/detail/show-detail.component';
import { PersonDetailComponent } from './components/detail/person-detail.component';
import { EpisodeDetailComponent } from './components/detail/episode-detail.component';
import { FormComponent } from './components/form/form.component';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'results', component: SearchResultComponent },
  { path: 'results/show/:id', component: ShowDetailComponent },
  { path: 'results/show/:id/:season/:episode', component: EpisodeDetailComponent },
  { path: 'results/person/:id', component: PersonDetailComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }
