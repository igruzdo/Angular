import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-toggle',
  template: `
<div class="toggle">
  <app-button  *ngFor="let item of toggles"
               [isActive]="isChanged(item.value)"
               [isDisabled]="isChanged(item.value)"
               [buttonValue]="item.value"
               [text]="item.label"
               [color]="isChanged(item.value) ? 'accent': 'default'"
               (click)="doChange(item.value)">

  </app-button>
</div>

  `,
  styles: [`
    .toggle{
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    *{
      margin-left: 10px;
    }`
  ]
})
export class ToggleComponent implements OnInit {
  @Input() value: string = '';
  @Input() color: string = 'default';
  @Input() toggles: any = [{
    value: 0,
    label: 'default'
  }]

  @Output() changed = new EventEmitter()

  doChange(orderBy:string) {
    this.changed.emit(orderBy)
    if(!orderBy) return;
    this.router.navigate(['.'], {relativeTo: this.rout, queryParams: {orderBy}})
  }

  isChanged(param:any) {
    return this.value === param
  }

  constructor(private router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
