import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { ProfileCustomizationsEndpoint } from '../common/endpoints/profile-customizations.endpoint';
import { ProfileService } from '../common/services/profile.service';

@Component({
  selector: 'prolific-avatar-shop',
  templateUrl: './avatar-shop.component.html'
})
export class AvatarShopComponent implements OnInit, OnDestroy {
  public profile: any;
  public clothes: any;
  private profileSubscription: Subscription;
  public selectedType: string;
  public clothesTypes: any[];

  constructor(
    public profileService: ProfileService,
    private profileCustomizationsEndpoint: ProfileCustomizationsEndpoint
  ) {}

  ngOnInit() {
    const profile$ = this.profileService.profileAfterLoaded$.take(1);

    this.profileSubscription = profile$
      .subscribe(profile => {
        if (profile) {
          this.profile = profile;
        }
      });

    const clothes = this.profileCustomizationsEndpoint.getAvailableClothes();

    this.clothesTypes = _.map(_.keys(clothes), item => {
      return {
        title: _.capitalize(item),
        code: item
      }
    });

    this.selectedType = this.clothesTypes[0].code;
    this.clothes = clothes;
  }

  ngOnDestroy() {
    this.profileSubscription.unsubscribe();
  }

  buyItem($event, item) {
    $event.preventDefault();
  }

  tryItem(item) {
    if (item.type === 'hat') {
      this.profile.userAvatar.hatURI = item.url;
    } else if (item.type === 'shirt') {
      this.profile.userAvatar.upperBodyClothingURI = item.url;
    } else if (item.type === 'pant') {
      this.profile.userAvatar.pantClothingURI = item.url;
    }
  }
}
