import { AfterViewInit, ComponentRef, Directive, ElementRef, HostListener, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import { MenuComponent } from '../menu.component';

@Directive({
  selector: '[menuDirective]'
})
export class MenuDirective implements AfterViewInit, OnDestroy {

  private contentForRender:string[] = []
  private isShow = true

  @Input() position:string = 'top'
  @Input('menuDirective') set content (value:any) {
    value.forEach((element:any) => {
      this.contentForRender.push(element)
    });
  }

  private componentRef!:ComponentRef<MenuComponent>

  @HostListener('click') onClick(){
    let heigth = parseInt(window.getComputedStyle(this.elRef.nativeElement.firstChild).height)
    let width = parseInt(window.getComputedStyle(this.elRef.nativeElement.firstChild).width)
    if(!this.componentRef) {
      this.componentRef = this.vcr.createComponent(MenuComponent)
      let content = this.createMenuContent()
      this.componentRef.instance.data = content
      this.isShow = !this.isShow
      this.componentRef.instance.position = this.position
      this.componentRef.instance.heightPadentEl = heigth
      this.componentRef.instance.widthPadentEl = width
    } 
    if(this.isShow) {
      this.isShow = !this.isShow
      this.componentRef.location.nativeElement.hidden = true
      
    } else {
      this.componentRef.location.nativeElement.hidden = false
      this.isShow = !this.isShow
    }
  }


  private createMenuContent() {
    let elementsText:Array<any> = [];
    this.contentForRender.forEach((el:string) => {
      elementsText.push(el)
    })
    return elementsText
  }

  constructor(
    private vcr:ViewContainerRef,
    private elRef:ElementRef
    ) { }
  
  ngAfterViewInit(): void {
    this.createMenuContent()
  }

  ngOnDestroy(): void {
      // this.componentRef.destroy()
  }
}
