import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';
import * as SearchActions from './../../store/search/search.actions';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  searchForm = new FormGroup({
    search: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient,
              private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.searchForm.value.search !== undefined && this.searchForm.value.search !== null) {
      this.store.dispatch(new SearchActions.SaveSearchKey(this.searchForm.value.search));
      this.store.dispatch(new SearchActions.SearchShowByName(this.searchForm.value.search));
      this.searchForm.reset();
      this.router.navigate(['/results']);
    }
  }

}
