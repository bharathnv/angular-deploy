import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RestService } from 'src/app/rest.service';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  public messageDetailsForm: FormGroup;
  public messageDetails = {
    body: '',
    to: ''
  };

  constructor(private dialogRef: MatDialogRef<MessageDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private restService: RestService,
    private commonService: CommonService) {
    this.messageDetailsForm = this.formBuilder.group({
      body: ['', Validators.required],
      to: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  ngOnInit() {
  }

  send(message: any) {
    if (message.valid === true) {
      this.messageDetails.body = message.controls['body'].value;
      this.messageDetails.to = message.controls['to'].value;
      this.restService.sendMessage(this.messageDetails).subscribe((data) => {
        this.commonService.openSnackBar('Message sent successfully', '');
        this.dialogRef.close();
      });
    } else {
      this.commonService.openSnackBar('Details are not correct', '');
    }
  }
}
