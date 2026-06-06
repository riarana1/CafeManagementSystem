import { Routes } from '@angular/router';
import { RouteGuardService } from '@/app/services/route-guard.service';

export const material_routes: Routes = [
  {
    path: 'category',
    loadComponent: () =>
      import('./manage-category/manage-category.component').then((m) => m.ManageCategoryComponent),
    canActivate: [RouteGuardService],
    data: { expectedRole: ['admin'] },
  },
  {
    path: 'product',
    loadComponent: () =>
      import('./manage-product/manage-product.component').then((m) => m.ManageProductComponent),
    canActivate: [RouteGuardService],
    data: { expectedRole: ['admin'] },
  },
  {
    path: 'order',
    loadComponent: () =>
      import('./manage-order/manage-order.component').then((m) => m.ManageOrderComponent),
    canActivate: [RouteGuardService],
    data: { expectedRole: ['admin', 'user'] },
  },
  {
    path: 'bill',
    loadComponent: () => import('./view-bill/view-bill.component').then((m) => m.ViewBillComponent),
    canActivate: [RouteGuardService],
    data: { expectedRole: ['admin', 'user'] },
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./manage-user/manage-user.component').then((m) => m.ManageUserComponent),
    canActivate: [RouteGuardService],
    data: { expectedRole: ['admin'] },
  },
];
