import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestPayoutService {
  constructor(private restangular: Restangular) { }

  getBalance(): Promise<any> {
    return this.restangular.one('delivery/balance').get().toPromise();
  }

  search(params: any): Promise<any> {
    return this.restangular.one('delivery/payout/requests').get(params).toPromise();
  }

  create(data): Promise<any> {
    return this.restangular.all('delivery/payout/request').post(data).toPromise();
  }

  stats(params): Promise<any> {
    return this.restangular.one('delivery/stats').get(params).toPromise();
  }

  findAccount(params: any): Promise<any> {
    return this.restangular.one('delivery/payout/accounts').get(params).toPromise();
  }
}
