import { Component, ViewChild, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import {
  // NotificationService,

  UserService,
  // LoaderService,
  CustomCarousel,
  ProfileCustomizationsService,
  AvatarClothes,
  ProfileService
} from '../common';

@Component({
  selector: 'prolific-registration',
  templateUrl: './registration.component.html',
  styleUrls: [ './registration.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit, OnDestroy {
  @ViewChild(CustomCarousel) private sliderComponent: CustomCarousel;

  public title = 'Prolific';
  public avatarClothes: AvatarClothes[] = [];

  public usernameAnimals: [string];
  public usernameActivities: [string];
  public usernameActionHeroes: [string];

  public singUpModel: any = {
    baseModel: undefined,
    username: undefined,
    email: ''
  };

  public userIsLoaded: boolean;

  private subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private profileCustomizationsService: ProfileCustomizationsService,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    /*const animals$ = this.registrationEndpoint.getUsernameAnimals();
     const activities$ = this.registrationEndpoint.getUsernameActivities();
     const heroes$ = this.registrationEndpoint.getUsernameActionHeros();*/

    this.subscriptions.push(
      this.profileCustomizationsService.avatarClothesAfterLoaded$.take(1)
        .subscribe(clothes => {
          this.singUpModel.clothes = clothes;
          this.avatarClothes = clothes;
        })
    );

    /*animals$.subscribe(data => this.usernameAnimals = data);
     activities$.subscribe(data => this.usernameActivities = data);
     heroes$.subscribe(data => this.usernameActionHeroes = data);*/

    /*this.loaderService.addPromise(Observable.combineLatest(avatarClothes$, animals$, activities$, heroes$)
     .toPromise());*/

    this.usernameAnimals = ['duck', 'wolf', 'tiger'];
    this.usernameActivities = ['football', 'baseball', 'surfing'];
    this.usernameActionHeroes = ['iron man', 'batman', 'superman']
  }

  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }

  submit() {
    const data = {
      email: this.singUpModel.email,
      username: this.singUpModel.username,
      userAvatar: {
        isActive: true,
        sexOfAvatar: this.singUpModel.baseModel.gender,
        avatarType: this.singUpModel.baseModel.avatarType,
        hatURI: this.singUpModel.clothes[0].selectedUrl,
        upperBodyClothingURI: this.singUpModel.clothes[1].selectedUrl,
        pantClothingURI: this.singUpModel.clothes[2].selectedUrl
      },
    };

    this.profileService.createProfile(data);
  }

  isNextPossible(currentIndex) {
    if (currentIndex === 0) {
      return (this.singUpModel.baseModel !== undefined) && !_.isEmpty(this.avatarClothes);
    } else if (currentIndex === 1) {
      return this.singUpModel.clothes !== undefined;
    } else if (currentIndex === 2) {
      return this.singUpModel.username !== undefined && !_.isEmpty(this.singUpModel.email);
    }
  }

  isPrevPossible(currentIndex) {
    return currentIndex !== 0;
  }

  isGoingToSlidePossible(index) {
    if (index) {
      if (index === 1) {
        return this.singUpModel.baseModel !== undefined && !_.isEmpty(this.avatarClothes);
      } else if (index === 2) {
        return this.singUpModel.baseModel !== undefined && this.singUpModel.clothes !== undefined;
      } else if (index === 3) {
        return this.singUpModel.baseModel !== undefined && this.singUpModel.clothes !== undefined && this.singUpModel.username !== undefined && !_.isEmpty(this.singUpModel.email);
      }
    } else {
      return true;
    }
  }

  goToSlideByIndex(index: number): void {
    if (this.isGoingToSlidePossible(index)) {
      if (index === 3) {
        this.submit();
        this.sliderComponent.goToSlideByIndex(index);
      } else {
        this.sliderComponent.goToSlideByIndex(index);
      }
    }
  }

  nextSlide() {
    if (this.sliderComponent.getCurrentSlideIndex() === 2) {
      this.submit();
      this.sliderComponent.next();
    } else {
      this.sliderComponent.next();
    }
  }

  previousSlide() {
    this.sliderComponent.prev();
  }
}
