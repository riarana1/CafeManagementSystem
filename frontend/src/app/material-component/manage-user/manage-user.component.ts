import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '@/app/user.service';
import { SnackbarService } from '@/app/services/snackbar.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { GlobalConstants } from '@/app/shared/global-constants';
import { MatCard } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
  imports: [CommonModule, MatCard, MatFormFieldModule, MatTableModule, MatSlideToggleModule, MatInputModule, MatTooltipModule]
})
export class ManageUserComponent implements OnInit {

  displayedColumns: string[] = ['name' , 'email' , 'contactNumber' , 'status'];
  dataSource = new MatTableDataSource<any>([]);
  responseMessage:any;

  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData() {
    this.userService.getUsers().subscribe((response:any)=>{
      this.dataSource.data = response;
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChange(status:any , id:any){
    var data = {
      status:status.toString(),
      id:id
    }
    this.userService.update(data).subscribe((response:any)=>{
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage , "success");
    },(error:any)=>{
      //console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        //alert("status is updated successfully");

        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }


}
