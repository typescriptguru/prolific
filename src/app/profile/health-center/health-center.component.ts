import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';

import { ACTIVITIES } from '../../common';

@Component({
  selector: 'health-center',
  templateUrl: './health-center.component.html'
})
export class HealthCenterComponent implements OnChanges {
  @Input() healthCenterData: any;

  activitiesList: any = _.keyBy(ACTIVITIES, 'code');
  lastActivity: any;
  lastNutrition: any;

  ngOnChanges(changes) {
    const currentValue = changes.healthCenterData.currentValue;

    if (!_.isEmpty(currentValue)) {
      this.lastActivity = _.last(currentValue[1]);
      this.lastNutrition = _.last(currentValue[0]);
    }
  }
}
