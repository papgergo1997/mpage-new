import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9.-_]{2,}@{1}[a-z0-9.-]{2,}\.{1}[a-z]{2,4}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z0-9.-_]{2,}$')
    ])
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value )
    this.submitted = true
  }

}
