import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  template: `
    <p>
      drop-down works!
    </p>
    <app-button></app-button>
  `,
  styles: [
  ]
})
export class DropDownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
