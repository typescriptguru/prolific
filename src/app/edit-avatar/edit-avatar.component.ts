import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import {
  ProfileService,
  AvatarClothes,
  ProfileCustomizationsService,
  AvatarBaseType,
  RegistrationService
} from '../common';

@Component({
  selector: 'prolific-edit-avatar',
  templateUrl: './edit-avatar.component.html'
})
export class EditAvatarComponent implements OnInit {
  public avatarCustomizations: AvatarClothes[] = [];
  public clothes: AvatarClothes[];
  public model: any = {};

  constructor(
    public profileService: ProfileService,
    private registrationService: RegistrationService,
    private profileCustomizationsService: ProfileCustomizationsService
  ) {}

  ngOnInit() {
    this.profileCustomizationsService.avatarClothesAfterLoaded$.take(1)
      .subscribe(clothes => {
        this.clothes = clothes;
        this.avatarCustomizations = clothes;
      });

    this.profileService.profileAfterLoaded$.take(1)
      .subscribe((profile) => {
        this.registrationService.getAvatarBases()
          .then((bases: [AvatarBaseType]) => {
            this.model.baseModel = _.find(bases, { nakedImageSource: profile.userAvatar.baseModelURI });
          });
      });
  }

  submit() {
    this.profileService.updateAvatar({
      userAvatar: {
        hatURI: this.avatarCustomizations[0].selectedUrl,
        upperBodyClothingURI: this.avatarCustomizations[1].selectedUrl,
        pantClothingURI: this.avatarCustomizations[2].selectedUrl
      }
    });
  }
}
