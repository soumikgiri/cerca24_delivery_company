import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { SystemService } from '../services';

@Injectable()
export class LanguageResolver implements Resolve<Observable<any>> {
  constructor(private systemService: SystemService) {}

  resolve(): any {
    return this.systemService.configs()
      .then((resp) => {
        // TODO - load from local storage
        return 'en';
      });
  }
}
