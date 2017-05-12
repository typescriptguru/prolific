import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { NutritionsService } from '../../common';

@Component({
  selector: 'nutritions-tab',
  templateUrl: './journal-items-nutritions.component.html'
})
export class ProfileJournalItemsNutritionsComponent implements OnInit, OnDestroy {
  @Output() callLatestUpdates: EventEmitter<any> = new EventEmitter(false);

  private selectedDish: any;
  private dishes: any[] = [];
  public slicedDishes: any[] = [];
  public pages: number[];
  private currentPage: number;
  private pagesQty;
  private pageSize = 5;
  private subscriptions: Subscription[] = [];

  constructor(public nutritionsService: NutritionsService) {}

  selectDish(dish) {
    this.selectedDish = dish;
  }

  addDish() {
    this.nutritionsService.createNutrition({
      nutritionObject: {
        hits: [this.selectedDish]
      }
    });
  }

  changePage(pageNumber) {
    this.currentPage = pageNumber;
    this.slicedDishes = this.dishes.slice(this.pageSize * pageNumber - this.pageSize, this.pageSize * pageNumber);
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
    this.pagesQty = _.floor((this.dishes.length + this.pageSize - 1) / this.pageSize);
    this.pages = _.times(this.pagesQty, i => i + 1);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.nutritionsService.nutritionsAfterLoaded$
        .subscribe(data => {
          this.dishes = data;
          this.refreshPagesCount();
          this.changePage(1);
        })
    );
  }

  ngOnDestroy() {
    _.each(this.subscriptions, item => item.unsubscribe());
  }
}
