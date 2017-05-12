import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptorService } from '@covalent/http'
import * as _ from 'lodash';

import { makeDefaultHeaders } from '../services';
import { AvatarClothes, AvatarCloseType } from '../types';

const GET_AVATAR_CLOTHES_URL: string = 'http://prolificwebapi.azurewebsites.net/api/RegisterAvatarClothes';
const GET_BACKGROUND_URL: string = 'http://prolificwebapi.azurewebsites.net/api/ProfileBackgrounds';

interface Dictionary<T> {
  [index: string]: T;
}

@Injectable()
export class ProfileCustomizationsEndpoint {
  constructor(private http: HttpInterceptorService) {}

  loadBackgrounds(): Observable<any> {
    return this.http.get(GET_BACKGROUND_URL, makeDefaultHeaders())
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  /*getAvatarClothes(profile): Observable<any> {
   return this.http.get(GET_AVATAR_CLOTHES_URL)
   .map(res => res.json())
   .map(data => {
   const clothes = data[0].AvatarClothing;

   clothes.hats = clothes.hats.item;
   clothes.shirts = clothes.shirts.item;
   clothes.pants = clothes.pants.item;

   return [
   new AvatarCustomization('hat', 'hat', this.getThingIndex(clothes.hats, 'hatURI', profile), clothes.hats.length, clothes.hats, ''),
   new AvatarCustomization('shirt', 'shirt', this.getThingIndex(clothes.shirts, 'upperBodyClothingURI', profile), clothes.shirts.length, clothes.shirts, ''),
   new AvatarCustomization('pants', 'pants', this.getThingIndex(clothes.pants, 'pantClothingURI', profile), clothes.pants.length, clothes.pants, '')
   ];
   });
   }*/

  loadAvatarClothes(profile?): Observable<AvatarClothes[]> {
    const clothes = <any>this.getAvailableClothes();

    return Observable.of([
      new AvatarClothes('hat', 'hat', this.getThingIndex(clothes.hat, 'url', profile), clothes.hat.length, <string[]>_.map(clothes.hat, 'url'), ''),
      new AvatarClothes('shirt', 'shirt', this.getThingIndex(clothes.shirt, 'url', profile), clothes.shirt.length, <string[]>_.map(clothes.shirt, 'url'), ''),
      new AvatarClothes('pants', 'pants', this.getThingIndex(clothes.pant, 'url', profile), clothes.pant.length, <string[]>_.map(clothes.pant, 'url'), '')
    ]);
  }

  getAvailableClothes(): Dictionary<AvatarCloseType[]> {
    return _.groupBy([{
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat1.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat2.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat3.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat4.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat5.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat6.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat7.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat9.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/hats/OJHat8.png',
      title: 'Some thing',
      price: 111,
      type: 'hat'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/GreyHoody.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/OJHoody.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/PinkHoody.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts1.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts2.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts3.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts4.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts5.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts6.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts7.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts8.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/shirts9.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/body/WhiteHoody.png',
      title: 'Some thing',
      price: 111,
      type: 'shirt'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/BLKpants.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants1.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants2.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants3.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants4.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants5.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants6.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants7.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants8.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }, {
      url: 'https://s3-us-west-2.amazonaws.com/prolific.static/assets/pants/pants9.png',
      title: 'Some thing',
      price: 111,
      type: 'pant'
    }], 'type');
  }

  private getThingIndex(array, field, profile) {
    return !_.isEmpty(profile) ? array.indexOf(profile.userAvatar[field]) + 1 : 1;
  }
}
