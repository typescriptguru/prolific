import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'prolific-pagination',
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  @Input() pages: number[];
  @Input() currentPage: number;
  @Input() hasPreviousPage: boolean;
  @Input() hasNextPage: boolean;
  @Output() selectPreviousPage: EventEmitter<false> = new EventEmitter();
  @Output() selectNextPage: EventEmitter<false> = new EventEmitter();
  @Output() changePage: EventEmitter<number> = new EventEmitter();
}
