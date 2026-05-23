import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from '../user.service';

import { ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { BestSellerComponent } from '../best-seller/best-seller.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, MatIcon, BestSellerComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.checkToken().subscribe({
      next: (response: any) => {
        this.router.navigate(['/cafe/dashboard']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  handleSignupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent, dialogConfig);
  }

  handleforgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }
  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }
}
