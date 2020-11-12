import { Injectable } from '@angular/core';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(private restangular: Restangular) { }

  me(): Promise<any> {
    return this.restangular.one('companies', 'me').get().toPromise();
  }

  updateMe(data): Promise<any> {
    return this.restangular.all('companies').customPUT(data).toPromise();
  }

  findOne(id): Promise<any> {
    return this.restangular.one('companies', id).get().toPromise();
  }

  update(id,data): Promise<any> {
    return this.restangular.one('companies', id).customPUT(data).toPromise();
  }
}
