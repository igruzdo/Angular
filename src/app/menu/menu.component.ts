import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <div >
      <p>Dropdown option</p>
    </div>
  `,
  styles: [`
    div {
      opacity: 1;
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
      position: relative;
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
export class MenuComponent implements OnInit {

  @Input() isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
