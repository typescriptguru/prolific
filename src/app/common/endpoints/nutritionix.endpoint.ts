import { Injectable } from '@angular/core';
import { URLSearchParams, Http } from '@angular/http';

import { NotificationService } from '../services';
import { NUTRITIONIX_KEY, NUTRITIONIX_ID } from '../config'

@Injectable()
export class NutritionixEndpoint {
  apiId: string = 'c3ac021c';
  appKey: string = '1f000e44a35ea4322ce547373495f2eb';

  constructor(
    private http: Http,
    private notificationService: NotificationService
  ) {}

  search(term: string) {
    let search = new URLSearchParams();

    search.set('appId', NUTRITIONIX_ID);
    search.set('appKey', NUTRITIONIX_KEY);
    // search.set('_urlFormat', 'json');
    search.set('results', '0:5');
    search.set('fields', 'item_name,item_id,nf_calories,nf_serving_size_qty,nf_serving_size_unit');
    search.set('sort.field', 'score');
    search.set('sort.order', 'desc');

    const request = this.http
      .get(`https://api.nutritionix.com/v1_1/search/${term}`, { search });
      // .catch(() => this.notificationService.error('Dishes wasn\'t loaded'));

    return request.map(res => res.json())
      .map((result): any[] => result.hits);
  }
}
