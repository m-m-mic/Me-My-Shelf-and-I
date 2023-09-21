import {Component} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";

@Component({
  standalone: true,
  imports: [DashboardComponent],
  template: `
    <app-dashboard />
  `,
})
export class DashboardContainerComponent {}
