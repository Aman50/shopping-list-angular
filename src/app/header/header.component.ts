import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()
  tabIndexSelected: EventEmitter<number> = new EventEmitter<number>();

  activeTabIndex: number;

  constructor() { }

  ngOnInit(): void {
  }

  selectedTab(tabIndex: number): void {
    this.activeTabIndex = tabIndex;
    this.tabIndexSelected.emit(this.activeTabIndex);
  }

}
