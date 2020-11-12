import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { DashboardLayoutComponent } from './layouts/dashboard/dashboard.component';

import { AuthGuard } from './shared/guard/auth.guard';
import { ConfigResolver, LanguageResolver } from './shared/resolver';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    resolve: {
      appConfig: ConfigResolver,
      language: LanguageResolver
    },
    children: [
      { path: '', loadChildren: './starter/starter.module#StarterModule' }
    ]
  },
  {
    path: 'auth',
    component: BlankComponent,
    resolve: {
      appConfig: ConfigResolver,
      language: LanguageResolver
    },
    children: [
      { path: '', loadChildren: './auth/auth.module#AuthModule' }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    resolve: {
      appConfig: ConfigResolver,
      language: LanguageResolver
    },
    children: [
      { path: 'orders', loadChildren: './orders/order.module#OrderModule' },
      { path: 'users', loadChildren: './user/user.module#UserModule' },
      { path: 'drivers', loadChildren: './driver/driver.module#DriverModule' },
      { path: 'categories', loadChildren: './category/category.module#CategoryModule' },
      { path: 'payout/account', loadChildren: './payout-account/account.module#AccountModule' },
      { path: 'payout/request', loadChildren: './request-payout/request-payout.module#RequestPayoutModule' },
      { path: 'zones', loadChildren: './delivery-zone/zone.module#DeliveryZoneModule' }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
