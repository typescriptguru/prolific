import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { ProfileService, makeDefaultHeaders } from '../services';
import { API_BASE_URL } from '../config';
import { NutritionType } from '../types';

@Injectable()
export class NutritionsEndpoint {
  private username: string;

  constructor(
    private http: Http,
    private profileService: ProfileService
  ) {
    profileService.username$.take(1).subscribe(username => {
      this.username = username;
    });
  }

  loadUserNutritions(): Observable<NutritionType[]> {
    let searchParams = new URLSearchParams();

    searchParams.append('username', this.username);
    searchParams.toString();

    /*return this.http.get(API_BASE_URL + '/nutrition', { search: searchParams })
      .map(res => res.json())
      .map((data: any[]) => _.flatten(_.map(data, item => item.NutritionObject.hits)))
      .map(data => _.filter(data, item => item && !_.isEmpty(item) && !_.isEmpty(item.fields)))
     .publishReplay(1)
     .refCount();*/

    return Observable.of([{
      id: '85660450-416b-47cf-9332-284dbd3c3bdc',
      userName: 'lenny_profilic',
      nutritionObject: {
        total_hits: 1,
        max_score: 2.1,
        hits: [{
          _index: 'sample string 1',
          _type: 'sample string 2',
          _id: 'sample string 3',
          _score: 4.1,
          fields: {
            item_id: 'sample string 1',
            item_name: 'sample string 2',
            brand_id: 'sample string 3',
            brand_name: 'sample string 4',
            nf_serving_size_qty: 5,
            nf_serving_size_unit: 'sample string 6',
            nf_calories: 7.0,
            nf_total_fat: 8.0
          }
        }, {
          _index: 'sample string 1',
          _type: 'sample string 2',
          _id: 'sample string 3',
          _score: 4.1,
          fields: {
            item_id: 'sample string 1',
            item_name: 'sample string 2',
            brand_id: 'sample string 3',
            brand_name: 'sample string 4',
            nf_serving_size_qty: 5,
            nf_serving_size_unit: 'sample string 6',
            nf_calories: 7.0,
            nf_total_fat: 8.0
          }
        }]
      }
    }])
      .delay(3000);
  }

  createNutrition(data): Observable<NutritionType> {
    /*return this.http.post(
      API_BASE_URL + '/nutrition',
      Object.assign({}, data, { username: this.username }),
      makeDefaultHeaders()
    )
      .map(res => res.json())
      .publishReplay(1)
      .refCount();*/

    return Observable.of(_.assign({}, data, {
      id: _.random(100500) + '123123123',
      userName: this.username
    }))
      .delay(3000);
  }
}
