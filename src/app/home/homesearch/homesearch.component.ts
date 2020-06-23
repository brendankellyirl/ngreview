import { Component, OnInit } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap,
  catchError
} from "rxjs/operators";

import {
  //EventCategoryService,
  EventService,
  SearchParamsService,
  IFilterParams
} from "../../core";
import { Router } from "@angular/router";

@Component({
  selector: "app-homesearch",
  templateUrl: "./homesearch.component.html",
  styleUrls: ["./homesearch.component.scss"]
})
export class HomesearchComponent implements OnInit {
  public model: any;
  public searching: boolean = false;
  public searchFailed: boolean = false;

  public searchParams: IFilterParams;
  public searchParamsSubscription: Subscription;

  constructor(
    private eventService: EventService,
    private router: Router,
    private searchParamsService: SearchParamsService
  ) {}

  ngOnInit() {
    this.searchParamsSubscription = this.searchParamsService
      .getFilterParams()
      .subscribe(
        res => {
          this.searchParams = res;
        },
        err => {
          console.error(
            `An error occurred getting search params: ${err.message}`
          );
        }
      );
  }

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

  public submitSearch(searchValue: string): void {
    //const params = new HttpParams().set("searchString", searchValue);
    //alert(params.toString());
    this.setSearchParams(searchValue);

    this.router.navigate(["/events"], {
      queryParams: { searchTerm: searchValue }
    });
  }

  public setSearchParams(searchTerm: string): void {
    let filterParams: IFilterParams = {
      title: searchTerm
    };
    this.searchParamsService.setFilterParams(filterParams);
  }
}
