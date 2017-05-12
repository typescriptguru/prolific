import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

import { NutritionixEndpoint } from '../../common';

@Component({
  selector: 'dishes-autocomplete',
  templateUrl: './dishes-autocomplete.component.html',
  host: {
    '(document:click)': 'handleClick($event)'
  }
})
export class DishesAutocompleteComponent {
  @Output() selectItem = new EventEmitter();

  public results: any[];
  public keyword = new FormControl();
  public query: string;
  private lastSelectedItem: string;

  constructor(
    public elementRef: ElementRef,
    private nutritionixEndpoint: NutritionixEndpoint
  ) {
    this.keyword
      .valueChanges
      .filter(query => !_.isUndefined(query))
      .debounceTime(500)
      .distinctUntilChanged()
      .flatMap(keywordStr => {
        if (keywordStr.length) {
          if (keywordStr.toString() === this.lastSelectedItem) {
            this.lastSelectedItem = undefined;

            return Observable.of([]);
          } else {
            return this.nutritionixEndpoint.search(keywordStr.toString())
          }
        }  else {
          return Observable.of([]);
        }
      })
      .subscribe(data => {
        this.results = data;
      });
  }

  select(item) {
    this.query = item.fields.item_name;
    this.lastSelectedItem = item.fields.item_name;
    this.results = [];

    this.selectItem.emit(item);
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;

    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }

      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if (!inside) {
      this.results = [];
    }
  }
}
