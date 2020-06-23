import {
  Component,
  OnInit,
  OnChanges,
  Input,
  EventEmitter,
  Output
} from "@angular/core";

import { NgNavigatorShareService } from "ng-navigator-share";

import { IEvent, GridLayoutService, WebNavAPIService } from "../../../../core";
import { EventListComponent } from "../event-list.component";
import { environment } from "../../../../../environments/environment";

/**
 * This class represents the lazy loaded EventListComponent.
 */
@Component({
  selector: "event-grid-comp",
  templateUrl: "event-grid.component.html",
  styleUrls: ["event-grid.component.css"]
})
export class EventGridComponent extends EventListComponent implements OnInit {
  private ngNavigatorShareService: NgNavigatorShareService;
  webNavAPIServiceVar: any;
  webNavSupported: boolean = false;
  BASE_URL: string = environment.canonical + "/events/";

  constructor(
    gridLayoutService: GridLayoutService,
    ngNavigatorShareService: NgNavigatorShareService,
    webNavAPIservice: WebNavAPIService
  ) {
    super(gridLayoutService);
    this.ngNavigatorShareService = ngNavigatorShareService;
    this.webNavAPIServiceVar = webNavAPIservice;
  }
  ngOnInit() {
    this.webNavSupported = this.webNavAPIServiceVar.getWebNavAPISupportStatus();
  }

  async shareApi(event: IEvent) {
    try {
      const sharedResponse = await this.ngNavigatorShareService.share({
        title: event.title,
        text: event.description,
        url: this.BASE_URL + event._id
      });
      console.log(sharedResponse);
    } catch (error) {
      console.log("You app is not shared, reason: ", error);
    }
  }
}
