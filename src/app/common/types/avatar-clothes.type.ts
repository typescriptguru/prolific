export class AvatarClothes {
  public animateDirection: direction = direction.right;

  constructor(
    public type: string,
    public cssClass: string,
    public selectedOption: number,
    public totalOptions: number,
    public urls: string[],
    public selectedUrl: string
  ) {
    this.selectedUrl = this.urls[this.selectedOption - 1];
  }

  choosePreviousOption() : void {
    this.animateDirection = direction.left;
    this.selectedOption = this.selectedOption == 1 ? this.totalOptions : this.selectedOption - 1;
    this.selectedUrl = this.urls[this.selectedOption - 1];
  }

  chooseNextOption() : void {
    this.animateDirection = direction.right;
    this.selectedOption = this.selectedOption == this.totalOptions ? 1 : this.selectedOption + 1;
    this.selectedUrl = this.urls[this.selectedOption - 1];
  }
}

export enum direction {
  left,
  right
}
