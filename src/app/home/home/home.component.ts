import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { CommonService } from '../../common.service';
import { MessageDetailsComponent } from '../message-details/message-details.component';
import { CallDialogComponent } from '../call-dialog/call-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CommonService]
})
export class HomeComponent implements OnInit {

  public user: any;
  public databaseRef: any;
  public userDetailsRef: any;
  public userAccountDetailsForm: FormGroup;
  public isUserDetailsSet = false;
  public isShowNote = true;

  constructor(private router: Router,
    private commonService: CommonService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user === null) {
      this.router.navigate(['/login']);
      return;
    }
    this.setUserDetails(this);
    this.userAccountDetailsForm = this.formBuilder.group({
      accountSid: ['', Validators.required],
      authToken: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.databaseRef = firebase.database().ref('userDetails/');
  }

  deleteAccount() {
    const userFireBase = firebase.auth().currentUser;
    const that = this;
    userFireBase.delete().then(function () {
      that.commonService.openSnackBar('Your account has been deleted', '');
      localStorage.clear();
      that.router.navigate(['/login']);
    }).catch(function (error) {
      that.commonService.openSnackBar('Some error occured, code: ' + error.code + ' message:' + error.message, '');
      return;
    });
  }

  logoutUser() {
    firebase.auth().signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.commonService.openSnackBar('Some error occured, code: ' + error.code + ' message:' + error.message, '');
      return;
    });
  }

  sendSMS() {
    const dialogRef = this.dialog.open(MessageDetailsComponent, {
      width: '40%',
      data: ''
    });

    dialogRef.afterClosed().subscribe((data) => { });
  }

  makeCall() {
    const dialogRef = this.dialog.open(CallDialogComponent, {
      width: '40%',
      data: ''
    });

    dialogRef.afterClosed().subscribe((data) => { });
  }

  setAccountSidAndAuthToken(userAccountDetailsForm: any) {
    if (userAccountDetailsForm.valid === true) {
      const accountSidLocal = userAccountDetailsForm.controls['accountSid'].value;
      const authTokenLocal = userAccountDetailsForm.controls['authToken'].value;
      const that = this;
      let obj = {};
      obj[this.user.uid] = {
        accountSid: accountSidLocal,
        authToken: authTokenLocal
      };
      this.databaseRef.set({
        obj
      }).then((data) => {
        that.setUserDetails(that);
      });
    }
  }

  setUserDetails(that: any) {
    firebase.database().ref('userDetails').child('obj/' + that.user.uid).once('value').then((snapshot) => {
      if (snapshot.val() !== null) {
        that.isUserDetailsSet = true;
        localStorage.setItem('accountSid', snapshot.val().accountSid);
        localStorage.setItem('authToken', snapshot.val().authToken);
      }
    });
  }

  closeNote() {
    this.isShowNote = false;
  }
}
