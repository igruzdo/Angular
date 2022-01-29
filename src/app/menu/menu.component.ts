import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MenuContainerDirective } from './directives/menu-container.directive';

@Component({
  selector: 'app-menu',
  template: `
  <div class="menu">
    <div class="menu-container" [style.top.px]="top" [style.right.px]="right">
      <p *ngFor="let item of data">{{item}}</p>
    </div>
  </div>
    
  `,
  styles: [`
  .menu {
    position:relative;
  }
    .menu-container {
      display: flex;
      flex-direction: column;
      margin-top: 8px;
      align-items: flex-start;
      padding: 4px 8px;
      background: #FFFFFF;
      border: 1px solid #EEEEEE;
      box-sizing: border-box;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 6px 8px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      width: 206px;
      transition: all 0.2s ease;
      position: absolute;
    }
  `
  ]
})
export class MenuComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() data!:string[];
  @Input() position!:string
  @Input() widthPadentEl!:number
  @Input() heightPadentEl!:number

  public top!:number
  public right!:number

  @ViewChild(MenuContainerDirective, {read:ElementRef}) container!:ElementRef

  constructor(private cdr:ChangeDetectorRef) { 
    
  }

  ngOnChanges(changes: SimpleChanges): void {
      
  }



  ngAfterViewInit(): void {
    
    const {height} = this.container.nativeElement.getBoundingClientRect()
    const {width} = this.container.nativeElement.getBoundingClientRect()

    console.log(this.position)

    switch (this.position) {
      case 'top':
        this.top =  - height
        this.right = 0
        break
      case 'left':
        this.top = -this.heightPadentEl
        this.right = this.widthPadentEl + 10
        break
      case 'botom':
        this.top = this.heightPadentEl
        this.right = 0
        break
      case 'right':
        this.top = -this.heightPadentEl
        this.right = -this.widthPadentEl - 40
        break
    }

    this.cdr.detectChanges()
    
    
  }

  ngOnInit(): void {

    console.log(this.widthPadentEl)
    console.log(this.heightPadentEl)
    
  }

}
