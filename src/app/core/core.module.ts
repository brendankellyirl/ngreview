import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  EventCategoryService,
  LinkMetaService,
  EventService,
  ScrollService,
  SeoService,
  DateFilterService,
  MessageService,
  AuthGuard,
  MockAuthService,
  StateService,
  JwtService,
  GoogleAnalyticsService,
  GridLayoutService,
  WebNavAPIService,
  SearchParamsService
} from "./services";

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    EventCategoryService,
    LinkMetaService,
    EventService,
    ScrollService,
    SeoService,
    DateFilterService,
    MessageService,
    AuthGuard,
    MockAuthService,
    StateService,
    JwtService,
    GoogleAnalyticsService,
    GridLayoutService,
    WebNavAPIService,
    SearchParamsService
  ]
})
export class CoreModule {}
