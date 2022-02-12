import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button #tasknote
    id='forTest'
    [style.background-color]="newColor"
            [class.active] = "isActive"
            [class.default]="isDefault"
            [class.large]="isLarge"
            [class.small]="isSmall"
            [attr.disabled] = "isDisabled? '': null"
            [attr.value]="buttonValue"
            *ngIf="buttonValue"
            data-testid="buttonTest"
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
  @ViewChild('tasknote') input!: ElementRef;

  @Input() text: string = 'Dropdown button';
  @Input() set color (value: string) {
      this.newColor = this.colors[value]
  }
  @Input() set size (value:string) {
    switch (value){
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
  @Input() isActive = false;
  @Input() isDisabled = false;
  @Input() buttonValue: string = 'defaultValue';

  newColor: any;
  isDefault: boolean = true;
  isLarge: boolean = false;
  isSmall: boolean = false;

  ngOnChanges() { }

  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }

  public colors: {[index: string]:string} = {
    default: '#0099FF',
    primary: '#1a05ff',
    accent: '#ff00f7',
    warning: '#f00',
    success: '#0eed33',
  }

  public sizes: {[index: string]:any} = {
    default: '174px',
    large: '100%',
    small: '70%'
  }

  constructor() {  }
  ngOnInit() {  }
}
