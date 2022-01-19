import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Component({
  selector: 'app-tabs-header',
  template: `
    <div [ngClass]="{active: isActive}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
     div {
      font-family: Inter;
      font-weight: 500;
      display: inline-block;
      padding: 2px 10px;
      background-color: #f5f5f5;
      border: 1px solid #FFF;
      font-size: 14px;
      line-height: 1.5;
      cursor: pointer;
    }
    .active {
      background-color: #CCC;
      
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsHeaderComponent implements OnInit {
  @Input() tabHeaderCount!:any;


  set isActive(value:boolean) {
    this._isActive = value
    this.cdr.detectChanges()
  }

  get isActive() {
    return this._isActive
  }
  private _isActive = false;
  public click$: Observable<Event> = fromEvent(this.host.nativeElement, 'click')

  constructor(private host: ElementRef, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

}
