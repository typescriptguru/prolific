import { Component, Output, EventEmitter, OnInit } from '@angular/core';

interface ProlificJournalItemsTab {
  id: number;
  title: string;
  icon: string;
}

@Component({
  selector: 'profile-journalitems',
  templateUrl: './journal-items-navigation.component.html',
})
export class ProfileJournalItemsNavigationComponent implements OnInit {
  @Output() callLatestUpdates: EventEmitter<any> = new EventEmitter(false);

  tabs: ProlificJournalItemsTab[] = [{
    id: 0,
    title: 'Activity',
    icon: 'assets/img/slider-list-item-5.png'
  }, {
    id: 1,
    title: 'Nutrition',
    icon: 'assets/img/slider-list-item-4.png'
  }, {
    id: 2,
    title: 'Events',
    icon: 'assets/img/slider-list-item-3.png'
  }];

  activeTab: ProlificJournalItemsTab;

  ngOnInit() {
    this.activeTab = this.tabs[0];
  }
}
