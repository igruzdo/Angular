import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  template: `
    <div>
      <app-button color="default" size="default" (click)="isShowToggleClick()" (mouseover)="isShowToggleHover()"></app-button>
      <app-menu [isOpen]="isShow"></app-menu>
    </div>
  `,
  styles: [
    `div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
    }`
  ]
})
export class DropDownComponent implements OnInit {

  @Input() isShow = false;
  @Input() trigger = 'click';
  constructor() { }

  ngOnInit(): void {
  }
  isShowToggleClick() {
    if(this.trigger === 'click'){
      this.isShow = !this.isShow;
    }
  }
  isShowToggleHover() {
    if(this.trigger === 'hover'){
      this.isShow = !this.isShow;
    }
  }
}
