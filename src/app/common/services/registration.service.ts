import { Injectable } from '@angular/core';

import { AvatarBaseType } from '../types/avatar-base.type';

@Injectable()
export class RegistrationService {
  getAvatarBases(): Promise<AvatarBaseType[]> {
    return Promise.resolve(AVATAR_BASES.filter(x => x.isActive == true));
  }
}

export const AVATAR_BASES: AvatarBaseType[] = [{
    avatarBaseLookupID: 1,
    name: 'Monkey Female',
    imageSource: '../assets/img/avatar_bases/monkey_female.png',
    isActive: true,
    lvlRequirement: 0,
    nakedImageSource: '../assets/img/avatar_bases/monkey_female_naked.png',
    gender: 1,
    avatarType: 1
  }, {
    avatarBaseLookupID: 2,
    name: 'Monkey Male',
    imageSource: '../assets/img/avatar_bases/monkey_male.png',
    isActive: true,
    lvlRequirement: 0,
    nakedImageSource: '../assets/img/avatar_bases/monkey_male_naked.png',
    gender: 0,
    avatarType: 1
  }, {
    avatarBaseLookupID: 3,
    name: 'Rabbit Female',
    imageSource: '../assets/img/avatar_bases/rabbit_female.png',
    isActive: true,
    lvlRequirement: 5,
    nakedImageSource: '../assets/img/avatar_bases/monkey_female_naked.png',
    gender: 1,
    avatarType: 2
  }, {
    avatarBaseLookupID: 4,
    name: 'Rabbit Male',
    imageSource: '../assets/img/avatar_bases/rabbit_male.png',
    isActive: true,
    lvlRequirement: 5,
    nakedImageSource: '../assets/img/avatar_bases/monkey_female_naked.png',
    gender: 0,
    avatarType: 2
  }, {
    avatarBaseLookupID: 5,
    name: 'Wolf Female',
    imageSource: '../assets/img/avatar_bases/wolf_female.png',
    isActive: true,
    lvlRequirement: 5,
    nakedImageSource: '../assets/img/avatar_bases/monkey_female_naked.png',
    gender: 1,
    avatarType: 3
  }, {
    avatarBaseLookupID: 6,
    name: 'Wolf Male',
    imageSource: '../assets/img/avatar_bases/wolf_male.png',
    isActive: true,
    lvlRequirement: 5,
    nakedImageSource: '../assets/img/avatar_bases/monkey_female_naked.png',
    gender: 0,
    avatarType: 3
  }/*,
   {
   avatarBaseLookupID: 7,
   name: 'Yeti Male',
   imageSource: 'Test',
   isActive: false,
   lvlRequirement: 5,
   avatarType: 4
   },
   {
   avatarBaseLookupID: 8,
   name: 'Yeti Female',
   imageSource: 'Test',
   isActive: false,
   lvlRequirement: 5,
   avatarType: 4
   }*/];
