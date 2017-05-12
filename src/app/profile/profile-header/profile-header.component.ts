import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ProfileEndpoint, NotificationService, ProfileCustomizationsService } from '../../common';

@Component({
  selector: 'profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: [ './profile-header.component.scss' ]
})
export class ProfileHeaderComponent implements OnInit {
  @Input() profile: any;

  public backgroundImages: string[] = [];
  public currentBackgroundIndex = 0;

  constructor(
    public profileEndpoint: ProfileEndpoint,
    private notificationService: NotificationService,
    private profileCustomizationsService: ProfileCustomizationsService
  ) {}

  changeBackground() {
    if ((_.size(this.backgroundImages) - 1) === this.currentBackgroundIndex) {
      this.currentBackgroundIndex = 0;
    } else {
      this.currentBackgroundIndex += 1;
    }

    this.profileEndpoint.saveProfile(_.assign({}, this.profile, { backgroundURI: this.backgroundImages[this.currentBackgroundIndex] }))
      .subscribe(() => {
        this.notificationService.success('Profile saved successfully');
      });
  }

  ngOnInit() {
    this.profileCustomizationsService.backgroundsAfterLoaded$.take(1)
      .subscribe(data => {
        this.backgroundImages = <string[]>_.map(data, 'url');
        this.currentBackgroundIndex = !_.isEmpty(this.profile.backgroundURI) ? this.backgroundImages.indexOf(this.profile.backgroundURI) : 0;
      });
  }
}
