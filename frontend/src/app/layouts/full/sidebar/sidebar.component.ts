import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from '@/app/shared/menu-items';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SHARED_ACCORDION_DIRECTIVES } from '@/app/shared/shared.module';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    SHARED_ACCORDION_DIRECTIVES
  ]
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  userRole:any;
  token: string | null = localStorage.getItem('token');
  tokenPayload:any;

  private _mobileQueryListener: () => void;
  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);
  public menuItems = inject(MenuItems);

  constructor() {
    if (this.token) {
      this.tokenPayload = jwtDecode(this.token);
    }
    this.userRole = this.tokenPayload?.role;
    this.mobileQuery = this.media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
