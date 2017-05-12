import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscriber, Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';

import {
  NutritionsService,
  ProfileService,
  ProfileEndpoint,
  ActivitiesService,
  UserService
} from '../common';

@Component({
  selector: 'prolific-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profile: any;
  private username: string;
  public healthCenterData: any[];
  public latestUpdatesRequests$: Observable<Observable<any>>;
  private latestUpdatesRequestsSubscriber: Subscriber<any>;
  private subscriptions: Subscription[] = [];

  constructor(
    public userService: UserService,
    public profileService: ProfileService,
    private profileEndpoint: ProfileEndpoint,
    private nutritionsService: NutritionsService,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit() {
    this.latestUpdatesRequests$ = Observable.create((subscriber: Subscriber<Observable<any>>) => {
      this.latestUpdatesRequestsSubscriber = subscriber;

      this.profileService.profileAfterLoaded$
        .take(1)
        .subscribe(profile => {
          if (profile) {
            this.profile = profile;
            this.username = profile.username;

            Observable.combineLatest(
              this.nutritionsService.nutritionsAfterLoaded$,
              this.activitiesService.activitiesAfterLoaded$
            )
              .take(1)
              .subscribe(data => {
                this.healthCenterData = data;
              });

            const profileStatus$ = this.profileEndpoint.getProfileStatus(this.username);

            this.latestUpdatesRequestsSubscriber.next(profileStatus$);
          }
        });
    });
  }

  callLatestUpdates() {
    this.subscriptions.push(
      Observable.combineLatest(
        this.nutritionsService.nutritionsAfterLoaded$,
        this.activitiesService.activitiesAfterLoaded$
      )
        .subscribe(data => {
          this.healthCenterData = data;
        })
    );

    this.latestUpdatesRequestsSubscriber.next(this.profileEndpoint.getProfileStatus(this.username));
  }

  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }
}
