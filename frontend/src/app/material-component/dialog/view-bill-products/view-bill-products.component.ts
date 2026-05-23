import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent } from '@angular/material/dialog';
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: 'app-view-bill-products',
  templateUrl: './view-bill-products.component.html',
  styleUrls: ['./view-bill-products.component.scss'],
  imports: [MatToolbar, MatToolbarRow, MatIcon, MatDialogContent, MatTableModule]
})
export class ViewBillProductsComponent implements OnInit {

  dataplayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total'];
  dataSource: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<ViewBillProductsComponent>) { }

  ngOnInit() {

    this.data = this.dialogData.data;
    this.dataSource = JSON.parse(this.dialogData.data.productDetails);
    console.log(this.dialogData.data);
  }
}
