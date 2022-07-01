import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth
  ) { }

  // user logged

  private userLogged = new Subject<boolean>();

  watchUserLogged(): Observable<boolean> {
    return this.userLogged.asObservable();
  }
  setuserLogged(itemSearch: boolean) {
    this.userLogged.next(itemSearch);
  }

  //login

  async loginWithGoogle() {
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log("error en login con google: ", err);
      return null;
    }
  }


}
