import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http'
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { makeDefaultHeaders } from '../services';
import { API_BASE_URL } from '../config';

@Injectable()
export class RegistrationEndpoint {
  constructor(
    private http: HttpInterceptorService
  ) {}

  getUsernameAnimals() {
    return this.http.get(API_BASE_URL + '/username/animal', makeDefaultHeaders())
      .map((res: Response) => res.json());
  }

  getUsernameActivities() {
    return this.http.get(API_BASE_URL + '/username/activity', makeDefaultHeaders())
      .map((res: Response) => res.json());
  }

  getUsernameActionHeros() {
    return this.http.get(API_BASE_URL + '/username/hero', makeDefaultHeaders())
      .map((res: Response) => res.json());
  }

  getUsername(animal, activity, hero) {
    return Observable.of('kon_v_polto')
      .toPromise();

    /*let searchParams = new URLSearchParams();

    searchParams.append('animal', animal);
    searchParams.append('activity', activity);
    searchParams.append('hero', hero);

    searchParams.toString();

    return this.http.get(API_BASE_URL + '/username', _.assign({}, { search: searchParams }, makeDefaultHeaders()))
      .map((res: Response) => res.json())
      .toPromise();*/
  }
}
