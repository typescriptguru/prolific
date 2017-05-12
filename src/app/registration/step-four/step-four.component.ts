import { Component, Input } from '@angular/core';

@Component({
  selector: 'step-four',
  templateUrl: './step-four.component.html'
})

export class RegistrationStepFourComponent {
  @Input() public model: any;
}
