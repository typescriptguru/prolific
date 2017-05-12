import { Component, ViewEncapsulation } from '@angular/core';

import { LoaderService } from '../../services';

@Component({
  selector: 'prolific-big-loader',
  templateUrl: './loader.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
