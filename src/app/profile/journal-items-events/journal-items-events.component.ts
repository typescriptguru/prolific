import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'lodash';

import { EventsService, ProfileService } from '../../common';

@Component({
  selector: 'events-tab',
  templateUrl: './journal-items-events.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileJournalItemsEventsComponent implements OnInit, OnDestroy {
  @Input() events: any[];
  @Output() callLatestUpdates: EventEmitter<any> = new EventEmitter(false);

  public selectedEventId;
  public processedEvents: any = [];
  public eventTypes: string[] = ['Fitness', 'Nutrition'];
  public selectedEventType: string = this.eventTypes[0];
  private userEvents: any[] = [];
  public slicedUserEvents: any[] = [];
  public pages: number[];
  private currentPage: number;
  private allNotBeingParticipated: any[];
  private pagesQty;
  private pageSize = 5;
  private subscriptions: Subscription[] = [];

  constructor(
    public eventsService: EventsService,
    public profileService: ProfileService
  ) {}

  submit() {
    this.selectedEventId = null;
    this.eventsService.createEvent(this.selectedEventId);
  }

  changePage(pageNumber) {
    this.currentPage = pageNumber;
    this.slicedUserEvents = this.userEvents.slice(this.pageSize * pageNumber - this.pageSize, this.pageSize * pageNumber);
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
    this.pagesQty = _.floor((this.userEvents.length + this.pageSize - 1) / this.pageSize);
    this.pages = _.times(this.pagesQty, i => i + 1);
  }

  ngOnInit() {
    this.subscriptions.push(
      Observable.combineLatest(this.profileService.username$.take(1), this.eventsService.eventsAfterLoaded$)
        .subscribe(([username, events]) => {
          this.allNotBeingParticipated = _.filter(events, item => !this.isUserParticipateInEvent(item, username));
          this.processedEvents = _.groupBy(this.allNotBeingParticipated, 'type');
          this.userEvents = _.filter(events, item => this.isUserParticipateInEvent(item, username));

          this.refreshPagesCount();
          this.changePage(1);
        })
    );
  }

  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }

  private isUserParticipateInEvent(event, username): boolean {
    return _.includes(_.flatten(_.union(_.map(event.signups, 'userNames'))), username);
  }
}
