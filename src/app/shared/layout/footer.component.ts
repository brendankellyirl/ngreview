import { Component, OnInit } from "@angular/core";

//import { EventCategoryService } from "../../core";

@Component({
  selector: "global-footer",
  styleUrls: ["./footer.component.css"],
  templateUrl: "./footer.component.html"
})
export class FooterComponent implements OnInit {
  public eventCategories: any[];

  constructor() {}

  ngOnInit() {}
}
