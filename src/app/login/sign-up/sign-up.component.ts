import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { CommonService } from '../../common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router) {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signUp(form: any) {
    if (form.valid) {
      if (form.controls['password'].value === form.controls['confirmPassword'].value) {
        firebase.auth().createUserWithEmailAndPassword(form.controls['username'].value, form.controls['password'].value)
        .finally(() => {
          this.commonService.openSnackBar('Registered Successfully', '');
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          this.commonService.openSnackBar('Some error occured, code: ' + error.code + ' message:' + error.message, '');
        });
      }
    }
  }
}
