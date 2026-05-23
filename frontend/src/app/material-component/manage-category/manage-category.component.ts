import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from '@/app/services/category.service';
import { GlobalConstants } from '@/app/shared/global-constants';
import { SnackbarService } from '@/app/snackbar.service';
import { CategoryComponent } from '../dialog/view-bill-products/category/category.component';
import { MatCard } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss'],
  imports: [MatCard, MatIcon, MatFormField, MatLabel, MatTableModule]
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name' , 'edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private categoryService:CategoryService,
    private dialog:MatDialog,
    private SnackbarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData() {
    this.categoryService.getCategorys().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      console.log(error.error?.message);
      if(error.error?.message){
        this.responseMessage = error.error?.message; 
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.SnackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data={
      action:'Add'
    };
    dialogConfog.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
      this.tableData();
    })
  }
  handleEditAction(values:any){
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data={
      action:'Edit',
      data:values
    };
    dialogConfog.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent , dialogConfog);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    }); 
    const sub = dialogRef.componentInstance.onEditCatefory.subscribe((response)=>{
      this.tableData();
    })
  }
}
