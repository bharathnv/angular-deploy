import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router,
    private commonService: CommonService,
    private dialog: MatDialog) {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user === null) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
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

    dialogRef.afterClosed().subscribe((data) => {});
  }

  makeCall() {
    const dialogRef = this.dialog.open(CallDialogComponent, {
      width: '40%',
      data: ''
    });

    dialogRef.afterClosed().subscribe((data) => {});
  }
}
