import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Restangular, RestangularModule } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private restangular: Restangular) { }

  getLeaders(): Observable <Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable <Leader> {
    return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable <Leader> {
    return this.restangular.all('leaders').getList({featured: true})
               .pipe(map( leaders => leaders[0] ));
  }
}
