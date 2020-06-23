import { Component, OnInit, Input } from "@angular/core";
import { HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-event-search",
  templateUrl: "./event-search.component.html",
  styleUrls: ["./event-search.component.css"]
})
export class EventSearchComponent implements OnInit {
  //date variables
  public model: any;
  @Input() simplifiedDisplay: boolean = false;

  // public defaultFrom = new Date();
  // public defaultTo = new Date(
  //   this.defaultFrom.getTime() + 2 * 24 * 60 * 60 * 1000
  // );

  public defaultFrom;
  public defaultTo;

  constructor(private router: Router) {}

  ngOnInit() {}

  public onDateRangeSelection(range: { from: Date; to: Date }) {
    console.log(`Selected range: ${range.from} - ${range.to}`);
  }

  public submitSearch(searchValue: string): void {
    const params = new HttpParams().set("searchString", searchValue);
    //alert(params.toString());
    this.router.navigate(["/events"], {
      queryParams: { searchTerm: searchValue }
    });
  }
}
