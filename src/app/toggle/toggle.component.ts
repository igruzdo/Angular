import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-toggle',
  template: `
      <app-button  *ngFor="let item of toggles"
                   [isActive]="isChanged(item.value)"
                   [isDisabled]="isChanged(item.value)"
                   [buttonValue]="item.value"
                   [text]="item.label"
                   [color]="isChanged(item.value) ? 'accent': 'default'"
                   (click)="doChange(item.value)"
      ></app-button>
  `,
  styles: [`
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

  doChange(filter:string) {
    this.changed.emit(filter)
    if(!filter) return;
    this.router.navigate(['.'], {relativeTo: this.rout, queryParams: {filter}})
  }

  isChanged(param:any) {
    return this.value === param
  }

  constructor(private router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
  }
}
