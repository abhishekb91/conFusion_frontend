import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Restangular, RestangularModule } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private restangular: Restangular) { }

  getPromotions(): Observable <Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable <Promotion> {
    return this.restangular.one('promitions', id).get();
  }

  getFeaturedPromotion(): Observable <Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
               .pipe(map(promo => promo[0]));
  }
}
