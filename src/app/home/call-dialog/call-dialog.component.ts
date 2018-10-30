import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.css']
})
export class CallDialogComponent implements OnInit {

  public callDetailsForm: FormGroup;
  public callDetails = {
    url: '',
    to: '',
    accountSid: '',
    authToken: ''
  };

  constructor(private dialogRef: MatDialogRef<CallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restService: RestService,
    private commonService: CommonService) {
    this.callDetailsForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
    this.callDetails.accountSid = localStorage.getItem('accountSid');
    this.callDetails.authToken = localStorage.getItem('authToken');
  }

  ngOnInit() {
  }

  makeCall(call: any) {
    if (call.valid === true) {
      this.callDetails.to = call.controls['to'].value;
      this.restService.makeCall(this.callDetails).subscribe((data) => {
        this.commonService.openSnackBar('Called successfully', '');
        this.dialogRef.close();
      }, (error) => {
        this.commonService.openSnackBar('Error occured ' + error, '');
      });
    } else {
      this.commonService.openSnackBar('Details are not correct', '');
    }
  }
}
