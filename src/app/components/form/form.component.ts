import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    newUser: new FormControl(false)
  });

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.form.value.newUser) {
      this.store.dispatch(new AuthActions.TrySignup(this.form.value));
    } else {
      this.store.dispatch(new AuthActions.TryLogin(this.form.value));
    }
  }

}
