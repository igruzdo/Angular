import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[clickAbroad]',
  exportAs: 'clickAbroad'
})
export class ClickAbroadDirective {

  @Output() closed: EventEmitter<any> = new EventEmitter();

  @Input() className!: string;

  @HostListener('click', ['$event.target']) onClick(a:any) {
    if(a.className === this.className) {
      this.closed.emit()
    }
  }

  get host() {
    return this.elRef.nativeElement
  }

  constructor(private elRef: ElementRef) { }

}
