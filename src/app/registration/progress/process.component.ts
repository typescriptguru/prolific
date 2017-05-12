import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'registration-process',
  templateUrl: './process.component.html'
})
export class RegistrationProcessComponent {
  @Input() currentStep: number;
  @Output() goToSlideByIndex: EventEmitter<number> = new EventEmitter();

  isActiveStep(step: number): boolean {
    return step === this.currentStep;
  }

  showSlideByIndex(index: number) {
    if (index !== this.currentStep) {
      this.goToSlideByIndex.emit(index);
    }
  }
}
