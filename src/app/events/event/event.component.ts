import {
  Component,
  AfterViewInit,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { DOCUMENT } from "@angular/common";
import { isPlatformBrowser } from "@angular/common";

import { SeoService, EventService, ScrollService, IEvent } from "../../core";

@Component({
  selector: "event-comp",
  templateUrl: "event.component.html",
  styleUrls: ["event.component.css"]
})
export class EventComponent implements OnInit, AfterViewInit {
  //public event: IEvent;
  public event: any;
  public relatedEventsByLoc: any[];
  public relatedEventsByCat: any;
  //public categoryEvents: IEvent[];
  //public venueEvents: IEvent[];
  private sub: any;
  private slug: string;
  public eventCount: Number = 0;
  public events_error: Boolean = false;
  public events_loading: Boolean = true;
  public related_loc_events_error: Boolean = false;
  public related_loc_events_loading: Boolean = true;
  public related_cat_events_error: Boolean = false;
  public related_cat_events_loading: Boolean = true;
  public fixed: boolean = false;

  //MAP
  @ViewChild("mapContainer", { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  //MAP

  constructor(
    private seo: SeoService,
    public scrollService: ScrollService,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.slug = params["slug"]; // (+) converts string 'id' to a number

    //   if (this.slug) {
    //     this.getEvent(this.slug);

    //     //set seo headings
    //     this.seo.generateTags({
    //       //title: `What's on Letterkenny - ${this.event.title}`,
    //       //description: `${this.event.description}`,
    //       slug: "events"
    //     });
    //   }
    //if (this.slug) {
    // });

    this.event = this.route.snapshot.data["event"];

    //set seo headings
    this.seo.generateTags({
      title: `Liveely Letterkenny - ${this.event.event.title}`,
      description: `${this.event.event.description}`,
      slug: "event/" + this.event.event._id
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll($event: any) {
    let top = window.scrollY;
    if (top > 475) {
      this.fixed = true;
    } else if (this.fixed && top < 475) {
      this.fixed = false;
    }
  }

  ngAfterViewInit() {
    this.scrollService.scroll();
    this.mapInitializer();
  }

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 16
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map
  });

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }

  // public getEvent(eventID: String): void {
  //   this.eventService.getEvent(eventID).subscribe(
  //     data => {
  //       this.event = data.eventData;
  //       this.events_loading = false;
  //       this.relatedEventsByLoc = data.relatedLocEventData;
  //       this.relatedEventsByCat = data.relatedCatEventData;
  //       this.related_loc_events_loading = false;
  //       this.related_cat_events_loading = false;
  //       //console.log(data.eventData);
  //       //console.log(data.relatedEventData);
  //     },
  //     err => {
  //       this.events_error = true;
  //       this.events_loading = false;
  //       this.related_loc_events_loading = false;
  //       this.related_loc_events_error = true;
  //       this.related_cat_events_loading = false;
  //       this.related_cat_events_error = true;
  //       console.log(err.message);
  //       console.log(err.status);
  //     }
  //   );
  // }

  public getEventHeaderImageStyle2() {
    let style = {
      background:
        "url(" + this.event.imageUrl + ") center center cover no-repeat"
    };
    return style;
  }
}
