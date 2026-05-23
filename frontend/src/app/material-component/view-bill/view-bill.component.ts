import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { BillService } from '@/app/services/bill.service';
import { GlobalConstants } from '@/app/shared/global-constants';
import { SnackbarService } from '@/app/snackbar.service';
import { ConfirmationComponent } from '../dialog/view-bill-products/confirmation/confirmation.component';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { MatCard } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss'],
  imports: [CommonModule, MatCard, MatFormFieldModule, MatTableModule, MatIconModule, MatTooltipModule, MatInputModule]
})
export class ViewBillComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource = new MatTableDataSource<any>([]);
  responseMessage: any;

  private billservice = inject(BillService);
  private dialog = inject(MatDialog);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData() {
    this.billservice.getBills().subscribe((response: any) => {
      this.dataSource.data = response;
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfog = new MatDialogConfig();
    dialogConfog.data = {
      data: values
    };
    dialogConfog.width = "100%";
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfog);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });

  }
  handleDeleteAction(values: any) {
    const dialogConfog = new MatDialogConfig;
    dialogConfog.data = {
      message: 'delete ' + values.name + ' bill',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfog);
    const sub = dialogRef.componentInstance?.onEmistStatusChange.subscribe((response) => {
      this.deleteBill(values.id);
      dialogRef.close();
    })
  }
  deleteBill(id: any) {
    this.billservice.delete(id).subscribe((response: any)=>{
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  downloadReportAction(values: any) {
    var data = {
      name: values.name,
      email: values.email,
      uuid: values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount: values.total.toString(),
      productDetails: values.productDetails
    }
    this.downloadFile(values.uuid, data);
  }
  downloadFile(fileName: string, data: any) {

    this.billservice.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
    })
  }
}
