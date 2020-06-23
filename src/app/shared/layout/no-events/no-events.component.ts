import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "no-events",
  templateUrl: "no-events.component.html",
  styleUrls: ["no-events.component.css"]
})
export class NoEventsComponent implements OnInit {
  @Input()
  eventTotal?: Number;
  @Input()
  loadingStatus?: Boolean;
  @Input()
  errorStatus?: Boolean;

  constructor() {}

  ngOnInit() {}
}
