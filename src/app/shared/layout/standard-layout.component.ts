import { Component } from "@angular/core";

@Component({
  selector: "app-standard-layout",
  template: `
    <nav-bar></nav-bar>
    <router-outlet></router-outlet>
    <global-footer></global-footer>
  `,
  styles: []
})
export class StandardLayoutComponent {}
