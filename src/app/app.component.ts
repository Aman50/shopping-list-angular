import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-project-udemy';
  selectedTabIndex: number;

  displayTab(tabIndex: number): void {
    this.selectedTabIndex = tabIndex;
  }
}
