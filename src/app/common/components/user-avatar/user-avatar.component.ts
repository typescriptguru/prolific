import { Component, Input } from '@angular/core';

@Component({
  selector: 'prolific-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: [ './user-avatar.component.scss' ]
})
export class UserAvatarComponent {
  @Input() avatar: any;
}
