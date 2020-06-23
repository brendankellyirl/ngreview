import { Component, OnInit, AfterViewInit } from "@angular/core";

import { StateService, ScrollService } from "../core";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styles: ["h5 { font-weight: normal; }"]
})
export class NotFoundComponent implements OnInit, AfterViewInit {
  constructor(
    private stateService: StateService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.stateService.resetMobileNavStatus();
    this.scrollService.scroll();
  }

  ngAfterViewInit() {
    this.scrollService.scroll();
    this.stateService.resetMobileNavStatus();
  }
}
