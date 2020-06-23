import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { QuicklinkModule } from "ngx-quicklink";

import {
  EventListComponent,
  DatePickerComponent,
  SearchTypeaheadComponent,
  CategorySelectComponent,
  EventSearchComponent,
  SortingComponent,
  EventGridComponent,
  EventTableComponent
} from "./features";
import {
  DisplayDatePatternPipe,
  FormatEventDescriptionPatternPipe,
  FilterButtonLabelPipe,
  TruncatePipe,
  DisplayLocationAddressPipe
} from "./pipes";
import {} from "./pipes/event-description.pipe";
import {
  LoadingComponent,
  NavBarComponent,
  FooterComponent,
  CookieComponent,
  NoEventsComponent,
  BlankLayoutComponent,
  StandardLayoutComponent
} from "./layout";
import {
  AppShellNoRenderDirective,
  AppShellRenderDirective,
  MobileNavigationDirective
} from "./directives";
import {} from "./features/preferences/sorting/sorting.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgSelectModule,
    NgbModule,
    QuicklinkModule
  ],
  declarations: [
    EventListComponent,
    DisplayDatePatternPipe,
    FormatEventDescriptionPatternPipe,
    FilterButtonLabelPipe,
    LoadingComponent,
    NavBarComponent,
    FooterComponent,
    CookieComponent,
    NoEventsComponent,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
    DatePickerComponent,
    SearchTypeaheadComponent,
    CategorySelectComponent,
    SortingComponent,
    EventSearchComponent,
    BlankLayoutComponent,
    StandardLayoutComponent,
    MobileNavigationDirective,
    EventGridComponent,
    EventTableComponent,
    TruncatePipe,
    DisplayLocationAddressPipe
  ],
  exports: [
    QuicklinkModule,
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    EventListComponent,
    DisplayDatePatternPipe,
    FormatEventDescriptionPatternPipe,
    FilterButtonLabelPipe,
    LoadingComponent,
    NavBarComponent,
    FooterComponent,
    CookieComponent,
    NoEventsComponent,
    AppShellNoRenderDirective,
    AppShellRenderDirective,
    DatePickerComponent,
    SearchTypeaheadComponent,
    CategorySelectComponent,
    SortingComponent,
    EventSearchComponent,
    BlankLayoutComponent,
    StandardLayoutComponent,
    MobileNavigationDirective,
    EventGridComponent,
    EventTableComponent,
    TruncatePipe,
    DisplayLocationAddressPipe
  ]
})
export class SharedModule {}
