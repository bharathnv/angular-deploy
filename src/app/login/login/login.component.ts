import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login(form: any) {
    if (form.valid) {
      // sign in with email and password
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(form.controls['username'].value, form.controls['password'].value)
        .catch((error) => {
          this.commonService.openSnackBar('Some error occured, code: ' + error.code + ' message:' + error.message, '');
          return;
        });
      // get user details and store in local storage
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/home/']);
        }
      });
    }
  }

  signUp(form: any) {
    if (form.valid) {
      if (form.controls['password'].value === form.controls['confirmPassword'].value) {
        firebase.auth().createUserWithEmailAndPassword(form.controls['username'].value, form.controls['password'].value)
        .finally(() => {
          this.commonService.openSnackBar('Registered Successfully', '');
          this.signUpForm.reset();
        })
        .catch((error) => {
          this.commonService.openSnackBar('Some error occured, code: ' + error.code + ' message:' + error.message, '');
        });
      }
    }
  }

}
