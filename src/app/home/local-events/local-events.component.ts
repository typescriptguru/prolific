import { Component, OnInit } from '@angular/core';

import { NotificationService, EventsEndpoint } from '../../common';

@Component({
  selector: 'local-events',
  templateUrl: './local-events.component.html'
})
export class LocalEventsComponent implements OnInit {
  events: any[];

  constructor(
    private notificationService: NotificationService,
    private eventsEndpoint: EventsEndpoint
  ) {}

  ngOnInit() {
    this.eventsEndpoint.loadEvents()
      .subscribe(data => {
        this.events = data.slice(0, 2);
      }, () => this.notificationService.error('Events weren\'t loaded'));
  }
}
