import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OrderListingComponent } from './component/list/listing.component';
import { OrderDetailComponent } from './component/view/detail.component';
import { MapModalComponent } from './component/map-modal/map-modal.component';
import { AssignDriverModalComponent } from './component/assign-driver-modal/assign-driver-modal.component';
import { DeliveryHistoryComponent } from './component/delivery-history/delivery-history.component';

import { DriverService } from '../driver/driver.service';
import { OrderService } from './order.service';
import { AuthService, LocationService } from '../shared/services';
import { DriversResolver } from './resolver/driver.resolver';
import { OrderResolver } from './resolver/order.resolver';
import { CategoriesResolver } from './resolver/categories.resolver';
import { UtilsModule } from '../utils/utils.module';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: OrderListingComponent
  },
  {
    path: 'details/:id',
    component: OrderDetailComponent,
    resolve: {
      driver: DriversResolver,
      order: OrderResolver,
      categories: CategoriesResolver
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    NgbModule,
    UtilsModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: window.appConfig.GoogleMapApiKey
    })
  ],
  declarations: [
    OrderListingComponent,
    OrderDetailComponent,
    MapModalComponent,
    DeliveryHistoryComponent,
    AssignDriverModalComponent
  ],
  providers: [
    OrderService,
    DriversResolver,
    OrderResolver,
    CategoriesResolver,
    DriverService,
    AuthService,
    LocationService
  ],
  entryComponents: [MapModalComponent, DeliveryHistoryComponent, AssignDriverModalComponent]
})
export class OrderModule {}
