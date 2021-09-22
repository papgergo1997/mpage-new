import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../model/user';
import * as firebase from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  login(email, password) {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(value => {
      this.router.navigate(['admin'])
    })
    .catch(error => {
      console.log('Something went wrong: ', error)
    });
  }

  // emailSignup(email: string, password: string) {
  //   this.fireAuth.createUserWithEmailAndPassword(email, password)
  //   .then(value => {
  //    console.log('Sucess', value);
  //    this.router.navigate(['admin']);
  //   })
  //   .catch(error => {
  //     console.log('Something went wrong: ', error);
  //   });
  // }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
