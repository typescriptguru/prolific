import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { RegistrationEndpoint, EmailValidator } from '../../common';

@Component({
  selector: 'step-three',
  templateUrl: './step-three.component.html'
})
export class RegistrationStepThreeComponent implements OnInit {
  @Input() model: any;
  @Input() animals: [string];
  @Input() activities: [string];
  @Input() actionHeroes: [string];
  @Input() readonlyEmail: boolean;

  selectedUsernameAnimal: string = null;
  selectedUsernameActivity: string = null;
  selectedUsernameActionHero: string = null;

  public emailControl: FormControl;

  constructor(private registrationEndpoint: RegistrationEndpoint) {}

  onChange() {
    const usernameData = [this.selectedUsernameAnimal, this.selectedUsernameActivity, this.selectedUsernameActionHero];

    if (_.filter(usernameData, _.isString).length === 3) {
      this.registrationEndpoint.getUsername(this.selectedUsernameAnimal, this.selectedUsernameActivity, this.selectedUsernameActionHero)
        .then((username: string) => this.model.username = username);
    }
  }

  ngOnInit() {
    this.emailControl = new FormControl(
      this.model.email,
      Validators.compose([Validators.required, EmailValidator])
    );

    this.emailControl
      .valueChanges
      .filter(() => !EmailValidator(this.emailControl))
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(email => {
        this.model.email = email;
      });
  }
}
