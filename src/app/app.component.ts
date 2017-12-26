import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    const config = {
      apiKey: 'AIzaSyDfJfI7qLFlB9o_OfMY0NCbFzl3G09pJ_8',
      authDomain: 'movies-cb286.firebaseapp.com',
      databaseURL: 'https://movies-cb286.firebaseio.com',
      projectId: 'movies-cb286',
      storageBucket: 'movies-cb286.appspot.com',
      messagingSenderId: '80941668212'
    };
    firebase.initializeApp(config);
  }

}
