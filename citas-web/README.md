# CitasWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Install Firebase (first time)
npm i @angular/fire firebase
Setup environmment (from firebase console)
### check app.module
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import from service
import { AngularFirestore } from '@angular/fire/compat/firestore';
create variable from constructor type AngularFirestore
create method to get data
getItemDB() {
    return this.itemData.collection('items').valueChanges();
  }

## Firebase Hosting
Setup: in general folder in console type

firebase init hosting
/ follow the steps below. Deployment: inside folder
dist/citas-web/
type
firebase deploy --only hosting

## Firebase Authentication
in app.module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
in imports {
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule
}

in service
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

async loginWithGoogle() {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
}

and use created method in component
