import {Component, Input, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [style.background-color]="newColor"
            [class.active] = "isActive"
            [style.width]="newSize"
            [attr.disabled] = "isDisabled? '': null"
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
      width: 170px;
      cursor: pointer;
      color: #FFF;
    }
    .active{
      font-weight: 600;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2), 0 6px 8px rgba(0, 0, 0, 0.2);
    }`
  ]
})
export class ButtonComponent implements OnInit, OnChanges{
  @Input() text: string = 'Dropdown button';
  @Input() color: any;
  @Input() size: any;
  @Input() isActive = false;
  @Input() isDisabled = false;

  newColor: any;
  newSize: any;

  ngOnChanges() {
    if(this.color) {
      this.newColor = this.colors[this.color]
    }
    if(this.size) {
      this.newSize = this.sizes[this.size]
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
