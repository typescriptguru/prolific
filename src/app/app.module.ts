import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastyModule } from 'ng2-toasty';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { ModalModule } from 'ng2-bootstrap/modal';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import { ROUTES } from './app.routes';
import { reducer } from './common/state/reducers';
import { AppComponent } from './app.component';

import {
  ActivitiesEffect,
  AuthEffect,
  EventsEffect,
  NutritionsEffect,
  ProfileCustomisationsEffect,
  ProfileEffect
} from './common/state/effects';

import {
  HomeComponent,
  LocalEventsComponent,
  HomeSubscriptionComponent
} from './home';

import {
  RegistrationComponent,
  RegistrationProcessComponent,
  RegistrationStepOneComponent,
  RegistrationStepTwoComponent,
  RegistrationStepThreeComponent,
  RegistrationStepFourComponent
} from './registration';

import {
  DishesAutocompleteComponent,
  HealthCenterComponent,
  ProfileJournalItemsActivitiesComponent,
  ProfileJournalItemsEventsComponent,
  ProfileJournalItemsNavigationComponent,
  ProfileJournalItemsNutritionsComponent,
  LatestUpdatesComponent,
  ProfileHeaderComponent,
  ProfileComponent
} from './profile';

import {
  EventsComponent
} from './events';

import {
  MentorComponent
} from './mentor';

import {
  AboutComponent
} from './about';

import {
  AvatarShopComponent
} from './avatar-shop';

import {
  EditProfileComponent
} from './edit-profile';

import {
  EditAvatarComponent
} from './edit-avatar';

import {
  ActivitiesService,
  AuthService,
  UserService,
  ProfileService,
  RegistrationService,
  ProfileCustomizationsService,
  LoaderService,
  NotificationService,
  EventsService,
  NutritionsService,
  AuthInterceptor
} from './common/services';

import {
  MailchimpEndpoint,
  UserEndpoint,
  ProfileEndpoint,
  AuthEndpoint,
  ProfileCustomizationsEndpoint,
  RegistrationEndpoint,
  ActivitiesEndpoint,
  NutritionsEndpoint,
  NutritionixEndpoint,
  EventsEndpoint
} from './common/endpoints';

import {
  CommonHeaderComponent,
  CustomCarousel,
  CustomSlide,
  AvatarEditorComponent,
  LoaderComponent,
  UserAvatarComponent,
  AuthorizedHeaderComponent,
  PaginationComponent,
  ExtendedInputComponent
} from './common/components';

import {
  SubstringPipe
} from './common/pipes';

import {
  AuthTokenGuard
} from './common/guards';

const APP_COMPONENTS = [
  AppComponent,
  HomeComponent,
  LocalEventsComponent,
  HomeSubscriptionComponent,
  CommonHeaderComponent,
  RegistrationComponent,
  RegistrationProcessComponent,
  RegistrationStepOneComponent,
  RegistrationStepTwoComponent,
  RegistrationStepThreeComponent,
  RegistrationStepFourComponent,
  CustomCarousel,
  CustomSlide,
  AvatarEditorComponent,
  LoaderComponent,
  DishesAutocompleteComponent,
  HealthCenterComponent,
  ProfileJournalItemsActivitiesComponent,
  ProfileJournalItemsEventsComponent,
  ProfileJournalItemsNavigationComponent,
  ProfileJournalItemsNutritionsComponent,
  LatestUpdatesComponent,
  ProfileHeaderComponent,
  ProfileComponent,
  SubstringPipe,
  UserAvatarComponent,
  AuthorizedHeaderComponent,
  PaginationComponent,
  EventsComponent,
  MentorComponent,
  AboutComponent,
  AvatarShopComponent,
  EditProfileComponent,
  EditAvatarComponent,
  ExtendedInputComponent
];

const httpInterceptorProviders: Type<IHttpInterceptor>[] = [
  AuthInterceptor
];

@NgModule({
  declarations: [
    APP_COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore(reducer),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    EffectsModule.run(ActivitiesEffect),
    EffectsModule.run(AuthEffect),
    EffectsModule.run(EventsEffect),
    EffectsModule.run(NutritionsEffect),
    EffectsModule.run(ProfileCustomisationsEffect),
    EffectsModule.run(ProfileEffect),
    ToastyModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: AuthInterceptor, paths: ['**'],
      }]
    })
  ],
  providers: [
    httpInterceptorProviders,
    UserService,
    RegistrationService,
    AuthService,
    MailchimpEndpoint,
    UserEndpoint,
    ProfileEndpoint,
    ProfileService,
    ProfileCustomizationsService,
    AuthEndpoint,
    LoaderService,
    NotificationService,
    ProfileCustomizationsEndpoint,
    RegistrationEndpoint,
    ActivitiesEndpoint,
    NutritionsEndpoint,
    NutritionixEndpoint,
    EventsEndpoint,
    ActivitiesService,
    EventsService,
    NutritionsService,
    AuthTokenGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
