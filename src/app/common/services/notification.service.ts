import { Injectable } from '@angular/core';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

@Injectable()
export class NotificationService {
  private toastOptions = {
    showClose: true,
    timeout: 5000,
    theme: 'material'
  };

  constructor(
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig
  ) {
    this.toastyConfig.theme = 'material';
  }

  private makeOptionsObject(object) {
    return Object.assign({}, this.toastOptions, object);
  }

  success(msg, title = 'Success') {
    this.toastyService.success(this.makeOptionsObject({ msg, title }));
  }

  error(msg, title = 'There is some error') {
    this.toastyService.error(this.makeOptionsObject({ msg, title }));
  }
}
