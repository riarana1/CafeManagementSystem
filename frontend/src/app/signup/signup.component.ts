import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatFormField, MatError, MatLabel, MatHint, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatIcon,
    MatToolbar,
    MatToolbarRow,
    MatDialogContent,
    MatFormField,
    MatError,
    MatLabel,
    MatHint,
    MatDialogActions,
    MatInput,
    MatButton,
    MatIconButton,
    MatDialogClose,
    MatSuffix,
  ],
})
export class SignupComponent implements OnInit {
  password = true;
  confirmPassword = true;
  signupForm!: FormGroup;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<SignupComponent>,
    //private ngxService:NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)],
      ],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }
  validateSubmit() {
    if (
      this.signupForm.controls['password'].value !=
      this.signupForm.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    //this.ngxService.start();
    var formDate = this.signupForm.value;
    var data = {
      name: formDate.name,
      email: formDate.email,
      contactNumber: formDate.contactNumber,
      password: formDate.password,
    };

    this.userService.signup(data).subscribe(
      (response: any) => {
        //this.ngxService.stop();
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
        alert('Successfully Login');
        this.router.navigate(['/cafe/login']);
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
