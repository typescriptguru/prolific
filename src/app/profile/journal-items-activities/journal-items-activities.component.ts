import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { ActivitiesService, ACTIVITIES } from '../../common';

@Component({
  selector: 'activities-tab',
  templateUrl: './journal-items-activities.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileJournalItemsActivitiesComponent implements OnInit, OnDestroy {
  @Output() callLatestUpdates: EventEmitter<any> = new EventEmitter(false);

  private minutes;
  private userActivities: any[] = [];
  public listOfAllActivities = ACTIVITIES;
  private processedActivities;
  private slicedUserActivities: any[] = [];
  public pages: number[];
  public currentPage: number;
  public journalActivitiesForm: FormGroup;
  private pagesQty;
  private pageSize = 5;
  private subscriptions: Subscription[] = [];

  constructor(public activitiesService: ActivitiesService) {
    this.processedActivities = _.keyBy(ACTIVITIES, 'code');

    this.journalActivitiesForm = new FormGroup({
      'activity': new FormControl(this.processedActivities[8].code, Validators.required),
      'minutes': new FormControl(0, Validators.required)
    });
  }

  submit(event) {
    event.preventDefault();

    const formValue = this.journalActivitiesForm.value;

    const data = {
      activity: formValue.activity,
      timeActiveInMinutes: formValue.minutes
    };

    this.activitiesService.createActivity(data);

    this.journalActivitiesForm.reset({
      'activity': this.processedActivities[8].code,
      'minutes': 0
    });

    // this.callLatestUpdates.emit(null);

    /*if (this.currentPage === this.pagesQty) {
      this.slicedUserActivities.push(newActivity);
    }*/
  }

  changePage(pageNumber) {
    this.currentPage = pageNumber;
    this.slicedUserActivities = this.userActivities.slice(this.pageSize * pageNumber - this.pageSize, this.pageSize * pageNumber);
  }

  selectPreviousPage() {
    if (this.hasPreviousPage()) {
      this.changePage(this.currentPage - 1);
    }
  }

  selectNextPage() {
    if (this.hasNextPage()) {
      this.changePage(this.currentPage + 1);
    }
  }

  hasPreviousPage() {
    return this.currentPage > 1;
  }

  hasNextPage() {
    return this.currentPage < this.pagesQty;
  }

  private refreshPagesCount() {
    this.pagesQty = _.floor((this.userActivities.length + this.pageSize - 1) / this.pageSize);
    this.pages = <number[]>_.times(this.pagesQty, i => i + 1);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.activitiesService.activitiesAfterLoaded$
        .subscribe(activities => {
          this.userActivities = activities;
          this.refreshPagesCount();
          this.changePage(1);
        })
    );
  }

  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }
}
