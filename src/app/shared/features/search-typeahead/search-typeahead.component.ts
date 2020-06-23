import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Observable, of } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap,
  catchError
} from "rxjs/operators";

import {
  //EventCategoryService,
  EventService,
  IQueryConfig
} from "../../../core";

@Component({
  selector: "search-typeahead",
  templateUrl: "search-typeahead.component.html",
  styleUrls: ["search-typeahead.component.scss"]
})
export class SearchTypeaheadComponent implements OnInit {
  public model: any;
  public events_error: boolean = false;
  public events_loading: boolean = true;
  public events: any[] = [];
  public eventCount: number = 0;
  public queryConfig: IQueryConfig = {
    offset: 0,
    limit: 6
  };
  public searching: boolean = false;
  public searchFailed: boolean = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {}

  public formatter = (x: { title: string }) => x.title;

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.eventService.searchEvents(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );
}
