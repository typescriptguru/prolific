import { Component, Input } from '@angular/core';

import { AuthService } from '../../services';

@Component({
  selector: 'authorized-header',
  templateUrl: './authorized-header.component.html'
})
export class AuthorizedHeaderComponent {
  @Input() profile: any;

  constructor(public authService: AuthService) {}
}
