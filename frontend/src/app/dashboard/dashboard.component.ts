import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '@/app/services/dashboard.service';
import { SnackbarService } from '@/app/services/snackbar.service';
import { GlobalConstants } from '@/app/shared/global-constants';

import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;

  ngAfterViewInit() {}

  constructor(
    private dashboardService: DashboardService,
    //private ngxService:NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) {
    //this.ngxService.start();
    this.dashboardData();
  }
  dashboardData() {
    this.dashboardService.getDetails().subscribe({
      next: (response: any) => {
        this.data = response;
      },
      error: (error: any) => {
        console.log(error);
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
