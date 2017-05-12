import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { ProfileService, makeDefaultHeaders } from '../services';
import { API_BASE_URL } from '../config';

@Injectable()
export class ActivitiesEndpoint {
  private username: string;

  constructor(
    private http: Http,
    private profileService: ProfileService
  ) {
    profileService.username$.take(1).subscribe(username => {
      this.username = username;
    });
  }

  loadActivities(): Observable<any[]> {
    let search = new URLSearchParams();

    search.append('username', this.username);
    search.toString();

    /*return this.http.get(API_BASE_URL + '/fitness', { search: search })
      .map(res => res.json())
      .publishReplay(1)
      .refCount();*/

    return Observable.of([{
      id: 1,
      activity: 9
    }, {
      id: 2,
      activity: 10
    }])
      .delay(3000);
  }

  createActivity(data): Observable<any> {
    /*return this.http.post(
      API_BASE_URL + '/fitness',
      Object.assign({}, data, { username: this.username }),
      makeDefaultHeaders()
    )
      .publishReplay(1)
      .refCount();*/

    return Observable.of(Object.assign({}, data, {
      id: _.random(100500),
      username: this.username
    }))
      .delay(3000);
  }
}
