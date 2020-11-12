import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderService } from '../order.service';

@Injectable()
export class OrderResolver implements Resolve<Observable<any>> {
  constructor(private service: OrderService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.findOne(route.params.id).then(res => {
      return res;
    });
  }
}
