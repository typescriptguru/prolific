import { Component, Input } from '@angular/core';

import { AvatarClothes, direction } from '../../types';

@Component({
  selector: 'avatar-editor',
  templateUrl: './avatar-editor.component.html',
  styleUrls: [ './avatar-editor.component.scss' ]
})
export class AvatarEditorComponent {
  @Input() singUpModel: any;
  @Input() avatarClothes: AvatarClothes[];

  nextOption(type: string): void {
    this.avatarClothes.find(x => x.type == type).chooseNextOption();
  }

  previousOption(type: string): void {
    this.avatarClothes.find(x => x.type == type).choosePreviousOption();
  }

  getCustomizationClass(type: string): string {
    const customization = this.avatarClothes.find(x => x.type == type);

    return customization.cssClass + '-' + customization.selectedOption + ' animate-' + direction[customization.animateDirection];
  }

  getCustomizationBackground(type: string): string {
    const customization = this.avatarClothes.find(x => x.type == type);

    return customization.selectedUrl;
  }
}
