import { Component, OnInit } from "@angular/core";
import {
  //EventCategoryService,
  EventCategoryService,
  ICategory
} from "../../../core";
import { Observable } from "rxjs";

@Component({
  selector: "categoryselect",
  templateUrl: "categoryselect.component.html",
  styleUrls: ["categoryselect.component.scss"]
})
export class CategorySelectComponent implements OnInit {
  //public variable to hold the list of categories returned
  public eventCategories: any[] = [];

  //multi select settings
  //public githubUsers$: Observable<any[]>;
  public githubUsers$: Observable<Array<ICategory>>;
  public selectedUsers1 = [];
  public selectedUsers2 = [];

  constructor(private eventCategoryService: EventCategoryService) {}

  ngOnInit() {
    //local function to populate event categories
    // this.loadEventCategories();
    this.githubUsers$ = this.eventCategoryService.getEventCategories;
  }

  /**
   * Function to return all event categorues
   * @memberof CategorySelectComponent
   */
  // private loadEventCategories(): void {
  //   this.eventCategoryService.getEventCategories().subscribe(
  //     data => {
  //       this.eventCategories = data;
  //     },
  //     err => {
  //       console.log("Error in service call for Event Categories");
  //     }
  //   );
  // }
}
