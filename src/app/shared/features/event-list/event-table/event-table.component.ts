import {
  Component,
  OnInit,
  OnChanges,
  Input,
  EventEmitter,
  Output
} from "@angular/core";

import { IEvent } from "../../../../core";
import { EventListComponent } from "../event-list.component";

/**
 * This class represents the lazy loaded EventListComponent.
 */
@Component({
  selector: "event-table-comp",
  templateUrl: "event-table.component.html",
  styleUrls: ["event-table.component.css"]
})
export class EventTableComponent extends EventListComponent implements OnInit {
  ngOnInit() {}
}
