import { AuthTokenGuard } from './common';
import { HomeComponent } from './home';
import { RegistrationComponent } from './registration';
import { ProfileComponent } from './profile';
import { EventsComponent } from './events';
import { MentorComponent } from './mentor';
import { AboutComponent } from './about';
import { AvatarShopComponent } from './avatar-shop';
import { EditProfileComponent } from './edit-profile';
import { EditAvatarComponent } from './edit-avatar';

export const ROUTES = [{
  path: '',
  component: HomeComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'registration',
  component: RegistrationComponent
}, {
  path: 'events',
  component: EventsComponent
}, {
  path: 'mentor',
  component: MentorComponent
}, {
  path: 'about',
  component: AboutComponent
}, {
  path: 'profile/:username',
  component: ProfileComponent,
  canActivate: [ AuthTokenGuard ]
}, {
  path: 'avatar-shop',
  component: AvatarShopComponent,
  canActivate: [ AuthTokenGuard ]
}, {
  path: 'edit-profile',
  component: EditProfileComponent,
  canActivate: [ AuthTokenGuard ]
}, {
  path: 'edit-avatar',
  component: EditAvatarComponent,
  canActivate: [ AuthTokenGuard ]
}, {
  path: '**',
  redirectTo: ''
}];
