import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <div class="list">
      <div class="list-item" *ngFor="let item of data">
        <p [attr.data-id]="item.id">Товар:{{ item.model }}. Количество: {{item.count}}</p>
        <span class="list-item-delete" (click)="deleteItem(item.id)">\t&times;</span>
      </div>
    </div>
  `,
  styles: [`
    .list {
      opacity: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 4px 8px;
      background: #FFFFFF;
      box-sizing: border-box;
      border-radius: 8px;
      width: 250px;
      transition: all 0.2s ease;
      position: relative;
      &-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid cornflowerblue;
        span {
          font-size: 30px;
        }
      &-delete {
         cursor: pointer;
       }
      }
    }
    p {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
    }
    .menu_hidden {
      opacity: 0;
      visibility: hidden;
      transform: translateY(-200px);
      transition: all 0.2s ease;
    }
    .menu_hidden_hover:hover {
      opacity: 1;
      visibility: hidden;
      transform: translateY(-200px);
      transition: all 0.2s ease;
    }
  `
  ]
})
export class ListComponent implements OnInit {

  @Input() isOpen = false;
  @Input() text = 'Default'
  @Input() data:any = []

  @Output() deleted = new EventEmitter();

  deleteItem(value:number) {
    this.deleted.emit(value)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
