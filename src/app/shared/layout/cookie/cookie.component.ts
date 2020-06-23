import { Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

const STORAGE_KEY = "cD";

@Component({
  selector: "cookie-disclaimer",
  templateUrl: "cookie.component.html",
  styleUrls: ["cookie.component.css"]
})
export class CookieComponent implements OnInit {
  public isAccepted: Boolean = false;

  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isAccepted =
        localStorage.getItem(STORAGE_KEY) == "true" ? true : false;
    }
  }

  public setLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, "true");
      this.isAccepted = true;
    }
  }
}
