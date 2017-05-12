import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { ProfileService, EmailValidator } from '../common';

@Component({
  selector: 'prolific-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: [ './edit-profile.component.scss' ]
})
export class EditProfileComponent implements OnInit, OnDestroy {
  public profile: any;
  public profileForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(public profileService: ProfileService) {}

  saveProfile(event) {
    this.profileService.updateProfile(this.profileForm.value);
    event.preventDefault();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.profileService.profileAfterLoaded$.first()
        .subscribe(profile => {
          if (profile) {
            this.profile = profile;

            this.profileForm = new FormGroup({
              'email': new FormControl(profile.email, Validators.compose([Validators.required, EmailValidator]))
            });
          }
        })
    );
  }

  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }
}
