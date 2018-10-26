import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule  } from '@angular/material';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonService } from '../common.service';
import * as Chat from 'twilio-chat';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { CallDialogComponent } from './call-dialog/call-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  declarations: [HomeComponent, MessageDetailsComponent, CallDialogComponent],
  providers: [CommonService],
  entryComponents: [MessageDetailsComponent, CallDialogComponent]
})
export class HomeModule { }
