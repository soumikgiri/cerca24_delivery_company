import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CompanyDeliveryZonesComponent,
  CreateZoneComponent,
  UpdateZoneComponent
} from './components';
import { LocationService } from '../shared/services';

import { ZoneService } from './zone.service';

const routes: Routes = [
  {
    path: '',
    component: CompanyDeliveryZonesComponent,
    data: {
      title: 'Manage Delivery Zones',
      urls: [{ title: 'Delivery Zones', url: '/zones' }, { title: 'Listing' }]
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgbModule.forRoot(),
    NgSelectModule
  ],
  declarations: [
    CompanyDeliveryZonesComponent,
    CreateZoneComponent,
    UpdateZoneComponent
  ],
  providers: [
    ZoneService,
    LocationService
  ],
  exports: [],
  entryComponents: [
    CreateZoneComponent,
    UpdateZoneComponent
  ]
})
export class DeliveryZoneModule { }
