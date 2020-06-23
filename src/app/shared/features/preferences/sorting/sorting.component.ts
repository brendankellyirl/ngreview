import { Component, OnInit } from "@angular/core";
import { GridLayoutService } from "../../../../core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sorting",
  templateUrl: "./sorting.component.html",
  styleUrls: ["./sorting.component.css"]
})
export class SortingComponent implements OnInit {
  public gridView: boolean;
  public gridSubscription: Subscription;

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

  public setDisplayPreference(pref: boolean): void {
    this.gridLayoutService.setLayout(pref);
  }

  /** UnSubscribe to the changes to the user preference of layout of grid or list */
  // ngOnDestroy(): void {
  //   this.gridSubscription.unsubscribe();
  // }
}
