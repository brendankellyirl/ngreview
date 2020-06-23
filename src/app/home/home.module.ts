import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { PopularEventsComponent } from "./popular-events/popular-events.component";
import { HomesearchComponent } from "./homesearch/homesearch.component";

@NgModule({
  declarations: [HomeComponent, PopularEventsComponent, HomesearchComponent],
  imports: [CommonModule, HomeRoutingModule, NgbModule, SharedModule]
})
export class HomeModule {}
