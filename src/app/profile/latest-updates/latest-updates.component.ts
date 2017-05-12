import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { NotificationService, ACTIVITIES } from '../../common';

const NULL_KEY = 'null';
const FITNESS_KEY = 'fitness';
const NUTRITION_KEY = 'nutrition';

const UPDATE_TYPES: any = [{
  id: NULL_KEY,
  title: 'All'
}, {
  id: FITNESS_KEY,
  title: 'Fitness'
}, {
  id: NUTRITION_KEY,
  title: 'Nutrition'
}, {
  id: 'events',
  title: 'Events'
}];

@Component({
  selector: 'latest-updates',
  templateUrl: './latest-updates.component.html',
  styleUrls: [ './latest-updates.component.scss' ]
})
export class LatestUpdatesComponent implements OnInit {
  @Input() requestsObservables: Observable<Observable<any>>;
  @Input() user: string;
  @Input() username: string;

  private updates: any[] = [];
  public updatesCopy: any[] = [];
  private hasNextUpdatesPage: boolean = false;
  private shownUpdatesQty: number = 3;
  private updatesPageSize: number = 9;
  private couldUpdatesBeCollapsed: boolean;
  private activitiesList: any = _.keyBy(ACTIVITIES, 'code');
  private updateTypes = UPDATE_TYPES;
  private filterControl = new FormControl(UPDATE_TYPES[0].id);

  constructor(private notificationService: NotificationService) {}

  showNextActivitiesPage() {
    this.shownUpdatesQty = this.shownUpdatesQty + this.updatesPageSize;
    this.hasNextUpdatesPage = !_.isUndefined(this.updates[this.shownUpdatesQty]);
    this.couldUpdatesBeCollapsed = true;
  }

  collapseUpdates() {
    this.shownUpdatesQty = 3;
    this.hasNextUpdatesPage = true;
    this.couldUpdatesBeCollapsed = false;
  }

  ngOnInit() {
    this.filterControl
      .valueChanges
      .distinctUntilChanged()
      .subscribe(value => {
        if (value && value !== NULL_KEY) {
          this.updates = _.filter(this.updatesCopy, item => {
            return item.type === value;
          });
        } else {
          this.updates = this.updatesCopy;
        }
      });

    this.requestsObservables.subscribe(request$ => {
      request$.subscribe(
        data => {
          this.updates = _(data)
            .map(item => {
              const isItFitnesActivity = !_.isEmpty(item.FitnessStatusList);
              let preparedItem = isItFitnesActivity ? item.FitnessStatusList[0] : item.NutritionStatusList[0];

              if (!isItFitnesActivity) {
                preparedItem = preparedItem.NutritionObject.hits[0];
              }

              return preparedItem;
            })
            .filter(item => !_.isEmpty(item))
            .map(item => {
              item.type = _.has(item, 'fields') ? NUTRITION_KEY : FITNESS_KEY;

              return item;
            })
            .filter(item => {
              return (item.type === NUTRITION_KEY && !_.isEmpty(item.fields)) || (item.type === FITNESS_KEY && item.activity);
            })
            .value();

          this.updatesCopy = _.cloneDeep(this.updates);

          this.hasNextUpdatesPage = !_.isUndefined(this.updates[this.shownUpdatesQty]);
        },
        error => this.notificationService.error('ProfileStatus data wasn\'t loaded')
      );
    })
  }
}
