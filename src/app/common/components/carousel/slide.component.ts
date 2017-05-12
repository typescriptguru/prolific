import { Component, OnInit, OnDestroy, Input, HostBinding } from '@angular/core';

import { CustomCarousel, Direction } from  './carousel.component';

@Component({
  selector: 'custom-slide',
  templateUrl: './slide.component.html'
})
export class CustomSlide implements OnInit, OnDestroy {
  @Input() public index:number;
  @Input() public direction:Direction;

  @HostBinding('class.active')
  @Input() public active: boolean;

  @HostBinding('class.item')
  @HostBinding('class.carousel-item')

  private addClass: boolean = true;

  constructor(private carousel:CustomCarousel) {
  }

  public ngOnInit() {
    this.carousel.addSlide(this);
  }

  public ngOnDestroy() {
    this.carousel.removeSlide(this);
  }
}
