import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { DriverService } from '../../driver/driver.service';

@Injectable()
export class DriversResolver implements Resolve<Observable<any>> {
  constructor(private service: DriverService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
      return this.service.search({}).then(res => {
        return res.data.items;
      });
    }
  }

