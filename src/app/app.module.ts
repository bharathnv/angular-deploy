import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatMenuModule  } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as firebase from 'firebase';
import { CommonService } from './common.service';
import { RestService } from './rest.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [CommonService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDikdrBuKfkzFCYlkIaw5qq1_AQKBEqV6I',
      authDomain: 'assignmentangular.firebaseapp.com',
      databaseURL: 'https://assignmentangular.firebaseio.com',
      projectId: 'assignmentangular',
      storageBucket: 'assignmentangular.appspot.com',
      messagingSenderId: '233225220103'
    });
  }
}
