import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  template: `
    <div class="dropdown">
      <app-button color="default" size="default" (click)="isShowToggleClick()" (mouseover)="isShowToggleHover()"></app-button>
      <div *ngIf='isShow' class="menu-wrapper">
        <app-menu ></app-menu>
      </div>
    </div>
  `,
  styles: [
    `
    .dropdown {
      position: relative;
    }
    .menu-wrapper {
      position: absolute;
      margin-top: 1px;
      padding: 8x;
      border-radius: 10px;
    }
    `
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
