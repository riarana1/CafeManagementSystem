import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";

import { ConfirmationComponent } from '@/app/material-component/dialog/view-bill-products/confirmation/confirmation.component';
import { ChangePasswordComponent } from '@/app/material-component/dialog/view-bill-products/change-password/change-password.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  imports: [MatIconModule, MatMenuModule, MatButtonModule]
})
export class AppHeaderComponent {
  role:any;
  constructor(private router:Router, private dialog:MatDialog) {
  }

  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:'Logout',
      configmation:true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmistStatusChange.subscribe((response)=>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }

  changepassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="550px";
    this.dialog.open(ChangePasswordComponent , dialogConfig);
  }

}
