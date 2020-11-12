import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrderService } from '../order.service';
import { AuthService } from '../../shared/services';

@Injectable()
export class CategoriesResolver implements Resolve<Observable<any>> {
  public id: string;
  constructor(
    private service: OrderService,
    private authService: AuthService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.authService.getCurrentUser().then(resp => {
      return this.service.getListCategory({ companyId: resp._id }).then(res => {
        return res.data.items;
      });
    });
  }
}
