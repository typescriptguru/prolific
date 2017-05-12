import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpInterceptorService } from '@covalent/http'
import { Observable } from 'rxjs';
import { UUID } from 'angular2-uuid';
import * as _ from 'lodash';

import { RegistrationService, makeDefaultHeaders } from '../services';
import { AvatarBaseType } from '../types';
import { API_BASE_URL } from '../config';

@Injectable()
export class ProfileEndpoint {
  constructor(
    private http: HttpInterceptorService,
    private registrationService: RegistrationService
  ) {}

  getProfile(email) {
    return Observable.of({
      id: '9748a05a-a26b-7dd4-434e-810d409fb444',
      level: 1,
      earnedExperience: 10,
      title: [
        'Journeyman'
      ],
      awardsEarned: [
        'https://s3-us-west-2.amazonaws.com/prolific.static/assets/badges/Activity/WelcomeBadge.png'
      ],
      backgroundURI: '',
      latestAchievement: 'Journeyman',
      availableSpendingPoints: 5,
      usedPoints: 0,
      totalPointsEarned: 5,
      lastLogin: 'Thu, 23 Mar 2017 07:25:20 GMT',
      email: 'mail@pavlov-a.ru',
      username: 'kon_v_polto',
      userAvatar: {
        isActive: true,
        sexOfAvatar: 0,
        avatarType: 1,
        hatURI: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat1.png',
        upperBodyClothingURI: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/GreyHoody.png',
        pantClothingURI: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/BLKpants.png'
      }
    })
      .publishReplay(1)
      .refCount();


    /*let search = new URLSearchParams();

     search.append('email', email);
     search.toString();

    return this.http.get(API_BASE_URL + `/profile`, _.assign({}, { search }, makeDefaultHeaders()))
      .map(res => res.json())
      .publishReplay(1)
      .refCount();*/
  }

  getProfileStatus(username) {
    let search = new URLSearchParams();

    search.append('username', username);
    search.toString();

    return this.http.get(`http://prolificwebapi.azurewebsites.net/api/ProfileStatus`, _.assign({}, { search }, makeDefaultHeaders()))
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  saveProfile(data) {
    if (data.id) {
      return this.updateProfile(data);
    } else {
      return this.createProfile(data);
    }
  }

  createProfile(data) {
    return this.http.post(
      API_BASE_URL + '/profile',
      Object.assign({}, {
        id: UUID.UUID(),
        level: 1,
        earnedExperience: 10,
        Title: ['Journeyman'],
        awardsEarned: ['https://s3-us-west-2.amazonaws.com/prolific.static/assets/badges/Activity/WelcomeBadge.png'],
        backgroundURI: '',
        latestAchievement: 'Journeyman',
        availableSpendingPoints: 5,
        usedPoints: 0,
        totalPointsEarned: 5,
        lastLogin: new Date().toUTCString()
      }, data)
    )
      .publishReplay(1)
      .refCount();
  }

  updateProfile(profile): Observable<any> {
    return Observable.of(profile)
      .delay(3000);

    /*return this.http.put(
      API_BASE_URL + '/profile' + profile.id,
      profile
    )
      .map(res => res.json())
      .publishReplay(1)
      .refCount()*/
  }

  getProfileWithAvatar(user) {
    return this.getProfile(user.email)
      .switchMap(profile => {
        return this.getProfileAvatar(profile)
          .map(userAvatar => {
            return _.assign({}, profile, { userAvatar });
          });
      })
      .publishReplay(1)
      .refCount();
  }

  private getProfileAvatar(profile) {
    const avatar = _.assign({}, profile.userAvatar);

    return Observable.fromPromise(this.registrationService.getAvatarBases())
      .map((bases: [AvatarBaseType]) => {
        avatar.baseModelURI = _.find(bases, (item) => {
          return item.gender === avatar.sexOfAvatar && item.avatarType === avatar.avatarType;
        }).nakedImageSource;

        return avatar;
      });
  }
}
