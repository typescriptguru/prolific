import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'extended-input',
  templateUrl: './extended-input.component.html'
})
export class ExtendedInputComponent implements OnChanges {
  @Input() id: string = '';
  @Input() labelText: string = null;
  @Input() dirty: any;
  @Input() inputErrors: any;
  @Input() errorDefs: any;
  @Input() helpText: string = null;
  @Input() required: boolean = false;

  hadFocus: boolean = false;
  errorMessage: string = '';

  ngOnChanges(changes: any): void {
    if (this.dirty) {
      const errors: any = this.inputErrors;

      this.errorMessage = '';

      if (errors) {
        _.keys(this.errorDefs).some(key => {
          if (errors[key]) {
            this.errorMessage = this.errorDefs[key];

            return true;
          }
        });
      }
    }
  }
}
