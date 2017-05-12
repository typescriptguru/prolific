import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { /*NotificationService, */MailchimpEndpoint, EmailValidator } from '../../common';

@Component({
  selector: 'home-subscription',
  templateUrl: './home-subscription.component.html'
})
export class HomeSubscriptionComponent {
  public subscriptionForm: FormGroup;

  constructor(
    private mailchimpEndpoint: MailchimpEndpoint,
    // private notificationService: NotificationService
  ) {
    this.subscriptionForm = new FormGroup({
      'email': new FormControl('', Validators.compose([Validators.required, EmailValidator]))
    });
  }

  onSubmit(event) {
    event.preventDefault();

    this.mailchimpEndpoint.subscribe(this.subscriptionForm.value.email)
      .subscribe(response => {
        // this.notificationService[response.result](response.msg);
        this.subscriptionForm.reset();
      });
  }
}
