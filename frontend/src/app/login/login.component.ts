import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
//import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatToolbar,
    MatToolbarRow,
    MatIcon,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatError,
    MatDialogActions,
    MatInput,
    MatButton,
    MatIconButton,
    MatDialogClose,
    MatSuffix,
  ],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm!: FormGroup;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<LoginComponent>,
    //private ngxService:NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, Validators.required],
    });
  }

  handleSubmit() {
    //this.ngxService.start();
    var formDate = this.loginForm.value;
    var data = {
      email: formDate.email,
      password: formDate.password,
    };

    this.userService.login(data).subscribe(
      (response: any) => {
        //this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        //alert("Successfully Login");
        this.router.navigate(['/cafe/dashboard']);
      },
      (error: { error: { message: any } }) => {
        //this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        alert(this.responseMessage + ' ' + GlobalConstants.error);
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    );
  }
}
