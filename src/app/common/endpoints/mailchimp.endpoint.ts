import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import { MAILCHIMP_KEY, MAILCHIMP_ID, MAILCHIMP_URL } from '../config';

@Injectable()
export class MailchimpEndpoint {
  constructor(private jsonp: Jsonp) {}

  subscribe(email: string) {
    let params = new URLSearchParams();

    params.set('u', MAILCHIMP_KEY);
    params.set('id', MAILCHIMP_ID);
    params.set('subscribe', 'Subscribe');
    params.set('EMAIL', email);
    params.set('c', 'JSONP_CALLBACK');

    return this.jsonp
      .get(MAILCHIMP_URL, { search: params })
      .map(response => <string[]> response.json()[1])
  }
}
