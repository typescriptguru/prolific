import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

import { RegistrationService, AvatarBaseType } from '../../common';

@Component({
  selector: 'step-one',
  templateUrl: './step-one.component.html'
})

export class RegistrationStepOneComponent implements OnInit {
  @Input() model: any;

  public avatarBases: AvatarBaseType[];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(){
    this.getAvatarBases();
  }

  getAvatarBases() {
    this.registrationService.getAvatarBases().then(x => this.avatarBases = x);
  }

  clicked(selectedAvatarBase) {
    if (selectedAvatarBase.lvlRequirement == 0) {
      this.model.baseModel = selectedAvatarBase;

      const previousSelectedModel = _.find(this.avatarBases, { active: true });

      if (previousSelectedModel) {
        previousSelectedModel.active = false;
      }

      selectedAvatarBase.active = true;
    } else {
      alert('No luck hombre. Pick again.');
    }
  }
}
