import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StatService {
  constructor(private restangular: Restangular) { }

  orderStat(): Promise<any> {
    return this.restangular.one('companies/delivery/orders/stats').get().toPromise();
  }

  saleStat(): Promise<any> {
    return this.restangular.one('companies/delivery/orders/stats/sales').get().toPromise();
  }
}
