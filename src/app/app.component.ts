import { IdleMonitorService } from "@scullyio/ng-lib";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { environment } from "../environments/environment";
import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from "@angular/core";
import { GoogleAnalyticsService } from "./core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {
  public title: string = "new app";

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(DOCUMENT) private document: any,
    private googleAnalyticsService: GoogleAnalyticsService,
    private idle: IdleMonitorService
  ) {}

  public ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      let bases = this.document.getElementsByTagName("base");

      if (bases.length > 0) {
        bases[0].setAttribute("href", environment.baseHref);
      }
    }

    // subscribe to the ga posts
    this.googleAnalyticsService.subscribe();
  }

  public ngOnDestroy(): void {
    // unsubscribe to the post
    this.googleAnalyticsService.unsubscribe();
  }
}
