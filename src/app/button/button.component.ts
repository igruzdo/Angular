import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [style.background-color]="newColor"
            [class.active] = "isActive"
            [class.default]="isDefault"
            [class.large]="isLarge"
            [class.small]="isSmall"
            [style.width]="newSize"
            [attr.disabled] = "isDisabled? '': null"
            [attr.value]="buttonValue"
            *ngIf="buttonValue"
    >{{text}}</button>
  `,
  styles: [`
    button {
      height: 36px;
      border-radius: 10px;
      border: 2px solid rgba(59, 101, 255, .1);
      font-family: Inter;
      font-weight: 400;
      font-size: 14px;
      cursor: pointer;
      color: #FFF;
      margin: 5px;
    }
    .active{
      font-weight: 600;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2), 0 6px 8px rgba(0, 0, 0, 0.2);
    }
    .default{
      width: 170px;
    }
    .large {
      padding: 15px 25px;
      font-size: 16px;
    }
    .small {
      padding: 5px 10px;
      font-size: 12px;
    }`
  ]
})
export class ButtonComponent implements OnInit, OnChanges{
  @Input() text: string = 'Dropdown button';
  @Input() color: any;
  @Input() size: any;
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() buttonValue: string = 'defaultValue';

  newColor: any;
  newSize: any;
  isDefault: boolean = true;
  isLarge: boolean = false;
  isSmall: boolean = false;

  ngOnChanges() {
    if(this.color) {
      this.newColor = this.colors[this.color]
    }
    switch (this.size){
      case 'default':
        this.isDefault = true;
        this.isLarge = false;
        this.isSmall = false;
        break;
      case 'large':
        this.isDefault = false;
        this.isLarge = true;
        this.isSmall = false;
        break;
      case 'small':
        this.isDefault = false;
        this.isLarge = false;
        this.isSmall = true;
        break;
    }

  }

  public colors: {[index: string]:string} = {
    default: '#0099FF',
    primary: '#1a05ff',
    accent: '#ff00f7',
    warning: '#f00',
    success: '#0eed33'
  }

  public sizes: {[index: string]:any} = {
    default: '174px',
    large: '100%',
    small: '70%'
  }

  constructor() {  }
  ngOnInit() {  }
}
