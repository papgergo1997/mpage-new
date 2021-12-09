import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  subscription: Subscription;
  userData: any;
  isAuthenticated: boolean;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private toaster: ToastrService
  ) {
    this.subscription = this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  login(email, password) {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.router.navigate(['']);
        this.toaster.success('Succesfull login', 'Success', { timeOut: 2000 });
      })
      .catch((error) => {
        this.toaster.error(error, 'Something went wrong: ', { timeOut: 5000 });
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

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  logout() {
    this.fireAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/']);
        this.toaster.success('Succesfull logout', 'Success', { timeOut: 2000 });
      })
      .catch((error) => {
        console.error(error);
        this.toaster.error(error, 'Something went wrong:', { timeOut: 5000 });
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
