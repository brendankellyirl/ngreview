import { Component, OnInit } from "@angular/core";
import { IQueryConfig, EventService } from "../../core";
import { Router } from "@angular/router";

@Component({
  selector: "app-popular-events",
  templateUrl: "./popular-events.component.html",
  styleUrls: ["./popular-events.component.css"]
})
export class PopularEventsComponent implements OnInit {
  public events_error: Boolean = false;
  public events_loading: Boolean = true;
  public events: any[] = [];
  public eventCount: Number = 0;

  public queryConfig: IQueryConfig = {
    offset: 0,
    limit: 6
  };

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    //get all events from service
    this.getEvents();
  }

  public selectEvent(event: any): void {
    //this.router.navigate(["/events/", event.slug]);
    this.router.navigate(["/events/", event._id]);
  }

  public getEvents(): void {
    this.eventService.getTrendingEvents(this.queryConfig).subscribe(
      data => {
        this.events = data.events;
        this.events_loading = false;
        this.eventCount = data.count;
        //console.log(JSON.stringify(this.events));
      },
      err => {
        this.events_error = true;
        this.events_loading = false;
        console.log("Error in service call getTrendingEvents");
      }
    );
  }
}
