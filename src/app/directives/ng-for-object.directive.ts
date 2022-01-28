import { Directive, DoCheck, Input, IterableChanges, IterableDiffer, IterableDiffers, KeyValueChangeRecord, KeyValueChanges, KeyValueDiffer, KeyValueDiffers, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngForObject]',
})
export class NgForObjectDirective implements DoCheck{
  public differ!: KeyValueDiffer<string, string | number>
  public inputObject!: {[key:string]: string | number}

  @Input() set ngForObjectIn(value: {[key:string]: string | number}) {
    this.inputObject = value;
    for (const key in this.inputObject) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: {
          value: this.inputObject[key],
          name: key
        }
      })
    }
  }

  ngDoCheck(): void {
    const objectChanges: KeyValueChanges<string, string | number> | null = this.differ.diff(this.inputObject)
    if(objectChanges) {
      console.log(objectChanges)
      objectChanges.forEachChangedItem((item: KeyValueChangeRecord<string, string | number>) => {
        this.viewContainer.createEmbeddedView(this.templateRef, {
          $implicit: {
            value: item.currentValue,
            name: item.key
          }
        })
      })
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private iterable: KeyValueDiffers) { 
    
  }

  ngOnInit() {
    this.differ = this.iterable.find(this.inputObject).create()
  }
}
