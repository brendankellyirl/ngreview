import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";

import { HttpParams } from "@angular/common/http";

import {
  //EventCategoryService,
  EventService,
  IEvent,
  SeoService,
  IQueryConfig,
  StateService,
  ScrollService
} from "../core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  //public events: IEvent[];
  public events_error: boolean = false;
  public events_loading: boolean = true;
  public events: any[] = [];
  public eventCount: number = 0;
  public model: any;
  public searching: boolean = false;
  public searchFailed: boolean = false;

  public queryConfig: IQueryConfig = {
    offset: 0,
    limit: 6
  };

  constructor(
    private seo: SeoService,
    private eventService: EventService,
    private router: Router,
    private stateService: StateService,
    private scrollService: ScrollService
  ) {}

  ngOnInit(): void {
    //set seo headings
    this.seo.generateTags({
      description: "Homepage of what's on Letterkenny"
    });

    this.stateService.resetMobileNavStatus();

    //get all events from service
    //this.getEvents();
  }

  ngAfterViewInit() {
    this.scrollService.scroll();
  }

  public selectEvent(event: any): void {
    //this.router.navigate(["/events/", event.slug]);
    this.router.navigate(["/events/", event._id]);
  }
}
