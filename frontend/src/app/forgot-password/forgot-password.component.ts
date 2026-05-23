import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any;
  responseMessage: any;

  registerSucess: boolean = false;
  isButtonVisible = true;

  constructor(
    private formBulider: FormBuilder,
    private userService: UserService,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBulider.group({
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
    });
  }

  handleSubmit() {
    var formData = this.forgotPasswordForm.value;
    var data = {
      email: formData.email,
    };

    this.userService.forgotPassword(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
        this.registerSucess = true;
        this.isButtonVisible = false;
      },
      error: (error: { error: { message: any } }) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      },
    });
  }
}
