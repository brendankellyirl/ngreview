import {
  Component,
  OnInit,
  OnChanges,
  Input,
  EventEmitter,
  Output
} from "@angular/core";

import { IEvent, GridLayoutService } from "../../../core";

/**
 * This class represents the lazy loaded EventListComponent.
 */
@Component({
  selector: "event-list-comp",
  templateUrl: "event-list.component.html",
  styleUrls: ["event-list.component.css"]
})
export class EventListComponent implements OnInit, OnChanges {
  // all input parameters
  //@Input() parentEvents: IEvent[];
  @Input()
  parentEvents?: any[];
  @Input()
  errorFlagVal?: Boolean = false;
  @Input()
  loadingVal?: Boolean = false;
  @Input()
  eventQuantity?: number = 0;
  @Input()
  eventCategory?: number[];
  @Input()
  eventVenue?: number;
  @Input()
  backgroundColour?: String;
  @Input()
  headingTitle?: String;
  @Input()
  addPadding?: Boolean = false;
  @Input()
  total?: Number;
  //public events: IEvent[];
  public events: any[];

  //output the event on click
  //@Output("eventOutput") eventEmitter = new EventEmitter<IEvent>();
  @Output("eventOutput")
  eventEmitter = new EventEmitter<any>();

  // default values
  quantity: number = 6;
  dark: String = "#f8f8f8";
  light: String = "#ffffff";

  //user selection of grid or list view of events
  public gridView: boolean = true;
  public gridSubscription;

  constructor(private gridLayoutService: GridLayoutService) {}

  ngOnInit() {
    /** Subscribe to the changes to the user preference of layout of grid or list */
    this.gridSubscription = this.gridLayoutService.getLayout().subscribe(
      res => {
        this.gridView = res;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnChanges() {
    this.events = this.parentEvents;
  }

  public getBgColour(): String {
    if (this.backgroundColour === "dark") {
      return this.dark;
    } else {
      return this.light;
    }
  }

  public selectEvent(event: any) {
    this.eventEmitter.emit(event);
  }

  /** UnSubscribe to the changes to the user preference of layout of grid or list */
  // ngOnDestroy(): void {
  //   this.gridSubscription.unsubscribe();
  // }
}
