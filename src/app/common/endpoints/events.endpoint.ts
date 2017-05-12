import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { ProfileService, makeDefaultHeaders } from '../services';
import { API_BASE_URL } from '../config';
import { EventType } from '../types';

@Injectable()
export class EventsEndpoint {
  private username: string;

  constructor(
    private http: Http,
    private profileService: ProfileService
  ) {
    profileService.username$.subscribe(username => {
      this.username = username;
    });
  }

  /*getEvents() {
    return this.http.get(API_BASE_URL + '/event', makeDefaultHeaders())
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }*/

  loadEvents(): Observable<EventType[]> {
    /*let search = new URLSearchParams();

     search.append('username', this.username);
     search.toString();

     return this.http.get(
     API_BASE_URL + '/event',
     _.assign({}, { search }, makeDefaultHeaders())
     )
     .map(res => res.json())
     .publishReplay(1)
     .refCount();*/

    return Observable.of([{
      id: _.random(100500) + '123118789787187263123-1237162387168723',
      eventId: 123123,
      eventLink: 'eqeqwe',
      type: 'Fitness',
      location: 'qweqweqwe',
      headerImage: 'adasdasdasdasd',
      eventTitle: 'asdqweqwe',
      eventDescription: 'asdas dasdasd',
      eventAchievement: 'sdasdasd',
      eventRewardGear: [{
        images: [{
          item: 'asdasdasdasdasd'
        }]
      }],
      signups: [{
        userNames: ['kon-v-11polto', 'asdawe qwsd']
      }],
      eventVideoLink: 'qweqeqwe',
      eventLocationTitle: 'qweqweqweqe',
      eventLocation: 'asdads adsasd',
      eventDate: 'asdadasd',
      eventStartTime: 'asdadasdasd',
      eventEndTime: 'qweqqwe',
      active: 'asdasd'
    }, {
      id: _.random(100500) + '123118789787187263123-1237162387168723',
      eventId: 123123,
      eventLink: 'eqeqwe',
      type: 'Nutrition',
      location: 'qweqweqwe',
      headerImage: 'adasdasdasdasd',
      eventTitle: 'asdqweqwe',
      eventDescription: 'asdas dasdasd',
      eventAchievement: 'sdasdasd',
      eventRewardGear: [{
        images: [{
          item: 'asdasdasdasdasd'
        }]
      }],
      signups: [{
        userNames: ['kon_v_polto', 'asdasd']
      }],
      eventVideoLink: 'qweqeqwe',
      eventLocationTitle: 'qweqweqweqe',
      eventLocation: 'asdads adsasd',
      eventDate: 'asdadasd',
      eventStartTime: 'asdadasdasd',
      eventEndTime: 'qweqqwe',
      active: 'asdasd'
    }])
      .delay(3000);

  }

  createEvent(id): Observable<EventType> {
    /*return this.http.post(this.getSubmitUrl(id), {}, makeDefaultHeaders())
     .publishReplay(1)
     .refCount();*/

    return Observable.of(Object.assign({}, {
      id: _.random(100500) + '123118789787187263123-1237162387168723',
      eventId: 123123,
      eventLink: 'eqeqwe',
      type: 'soqwe',
      location: 'qweqweqwe',
      headerImage: 'adasdasdasdasd',
      eventTitle: 'asdqweqwe',
      eventDescription: 'asdas dasdasd',
      eventAchievement: 'sdasdasd',
      eventRewardGear: [{
        images: [{
          item: 'asdasdasdasdasd'
        }]
      }],
      signups: [{
        userNames: [this.username]
      }],
      eventVideoLink: 'qweqeqwe',
      eventLocationTitle: 'qweqweqweqe',
      eventLocation: 'asdads adsasd',
      eventDate: 'asdadasd',
      eventStartTime: 'asdadasdasd',
      eventEndTime: 'qweqqwe',
      active: 'asdasd'
    }));
  }

  private getSubmitUrl(id) {
    return API_BASE_URL + '/event/' + id + '?username=' + this.username;
  }
}
