import { Component, OnInit, OnChanges, AfterViewInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import {
  SeoService,
  EventService,
  IQueryConfig,
  IFilterParams,
  IFilterQueryString,
  ScrollService
} from "../core";

/**
 * Display a list of all events that are active
 *
 * @export
 * @class EventsComponent
 * @implements {OnInit}
 */
@Component({
  selector: "events-comp",
  templateUrl: "events.component.html",
  styleUrls: ["events.component.css"]
})
export class EventsComponent implements OnInit {
  public events_error: Boolean = false;
  public events_loading: Boolean = true;
  public showMoreButton: Boolean = false;
  public events: any[] = [];
  public eventCount: Number = 0;
  public searchValue: string = "";
  public queryConfig: IQueryConfig = {
    offset: 0,
    limit: 6
  };
  public searchEventName: String = "";
  public catValues: any[];
  public dateRangeSelection: any[];

  /**
   *Creates an instance of EventsComponent.
   * @param {EventService} eventService
   * @param {SeoService} seo
   * @param {Router} router
   * @memberof EventsComponent
   */
  constructor(
    private eventService: EventService,
    private seo: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    public scrollService: ScrollService
  ) {}

  ngOnInit() {
    //set seo headings
    this.seo.generateTags({
      title: "What's on Letterkenny - All Events",
      description:
        "A quick list of all events across all categories and price ranges in Letterkenny. Co.Donegal",
      slug: "events"
    });

    //get the values from the queryString and fire the service call
    this.loadEvents();
  }

  public showMore(): void {
    this.queryConfig.offset = this.queryConfig.offset + this.queryConfig.limit;
    this.getEvents();
  }

  ngAfterViewInit() {
    this.scrollService.scroll();
  }

  public getEvents(): void {
    this.eventService.getEvents(this.queryConfig).subscribe(
      data => {
        this.events_loading = false;
        this.eventCount = data.count;
        this.events.push(...data.events);

        let runningTotal: Number =
          this.queryConfig.offset + this.queryConfig.limit;

        if (this.eventCount > runningTotal) {
          this.showMoreButton = true;
        } else {
          this.showMoreButton = false;
        }
        //console.log(JSON.stringify(this.events));
      },
      err => {
        this.events_error = true;
        this.events_loading = false;
        this.showMoreButton = false;
        console.log("Error in service call");
      }
    );
    //this.eventService.getEvents().subscribe(events => (this.events = events));
  }

  public loadEvents(): void {
    this.events = [];
    // this.route.queryParams.subscribe(params => {
    //   this.setFilters(params);
    // });

    this.getEvents();
  }

  public selectEvent(event: any): void {
    //this.router.navigate(["/events/", event.slug]);
    this.router.navigate(["/events/", event._id]);
  }
}
