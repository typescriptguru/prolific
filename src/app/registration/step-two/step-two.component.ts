import { Component, Input } from '@angular/core';

import { AvatarClothes } from '../../common';

@Component({
  selector: 'step-two',
  templateUrl: './step-two.component.html',
  styleUrls: [ './step-two.component.scss' ]
})
export class RegistrationStepTwoComponent {
  @Input() model: any;
  @Input() avatarClothes: AvatarClothes[];
}
