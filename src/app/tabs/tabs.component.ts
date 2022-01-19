import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList } from '@angular/core';
import { mapTo, merge, Observable } from 'rxjs';
import { TabsBodyComponent } from '../tabs-body/tabs-body.component';
import { TabsHeaderComponent } from '../tabs-header/tabs-header.component';

@Component({
  selector: 'app-tabs',
  template: `
    <div class="tabs">
      <ng-content select="app-tabs-header"></ng-content>
      <ng-content select="app-tabs-body"></ng-content>
    </div>
  `,
  styles: [`
    .tabs {
      font-size: 0;
      width:700px;
      height: 100px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabsHeaderComponent)
  public headerTabs!: QueryList<TabsHeaderComponent>

  @ContentChildren(TabsBodyComponent)
  public contentTabs!: QueryList<TabsBodyComponent>

  @ContentChild(TabsBodyComponent)
  public contentTab!: TabsBodyComponent

  startViews () {
    this.headerTabs.forEach((item,i) => {
      if(i == 0){
        item.isActive = true
      }
    })

    this.contentTabs.forEach((item,i) => {
      if(i == 0){
        item.isShow = true
      }
    })
    this.cdr.detectChanges()
  }

  constructor(private cdr: ChangeDetectorRef) {

   }

  ngAfterContentInit() {
    this.startViews()

    const clicks$: Array<Observable<TabsHeaderComponent>> = this.headerTabs.map((header) => header.click$.pipe(mapTo(header)))

    merge(...clicks$)
    .subscribe(c => {
      this.headerTabs.forEach(item => item.isActive = false)
      c.isActive = true
      this.contentTabs.forEach(item => {
        if(item.tabContentCount == c.tabHeaderCount) {
          item.isShow = true
        } else {
          item.isShow = false
        }
      })
    })
  }

  ngOnInit(): void {
  }
}
