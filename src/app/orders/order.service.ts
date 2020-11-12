import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {
  constructor(private restangular: Restangular) { }

  find(params: any): Promise<any> {
    return this.restangular.one('companies/delivery/orders').get(params).toPromise();
  }

  findOne(id: String): Promise<any> {
    return this.restangular.one('companies/delivery/orders', id).get().toPromise();
  }

  assignDriver(orderDetailId: String, params: any) {
    return this.restangular.one('companies/delivery/orders', orderDetailId).all('assign/drivers').post(params).toPromise();
  }

  getListCategory(params: any) {
    return this.restangular.one('companies/delivery/categories').get(params).toPromise();
  }

  updateCategory(orderDetailId: String, params: any) {
    return this.restangular.one('companies/delivery/orders', orderDetailId).one('categories').customPUT(params).toPromise();
  }

  exportOrderToCSV(params: any) {
    return this.restangular.one('companies/delivery/orders/export/csv').get(params).toPromise();
  }

  exportOrderToPDF(orderDetailId: string, access_token: any) {
    return this.restangular.one('companies/delivery/orders', orderDetailId).one('pdf').get(access_token).toPromise();
  }

  updateDeliveryStatus(id: String, params: any) {
    return this.restangular.one('companies/delivery/orders/', id).one('status').customPUT(params).toPromise();
  }

  location(orderDetailId: string): Promise<any> {
    return this.restangular.one('drivers/delivery/orders', orderDetailId).one('driver/location').get().toPromise();
  }

  findSeller(params: any): Promise<any> {
    return this.restangular.one('shops', 'search').get(params).toPromise();
  }

  assignDriverMultiple(data: any): Promise<any> {
    return this.restangular.all('companies/delivery/orders/assign/drivers').post(data).toPromise();
  }
}
