import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-tabs-body',
  template: `
    <div class="tabs-content" *ngIf="isShow">
      <ng-content></ng-content>
    </div>
`,
  styles: [`
  .tabs-content {
    border: 1px solid #e0e0e0;
    font-family: Inter;
    width:100%;
    padding: 2px 8px;
    font-size: 16px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
    top: 1px;
  }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsBodyComponent implements OnInit {

  @Input() tabContentCount!:any;

  set isShow(value:boolean) {
    this._isShow = value
    this.cdr.detectChanges()
  }

  get isShow() {
    return this._isShow
  }

  private _isShow = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {}

}
