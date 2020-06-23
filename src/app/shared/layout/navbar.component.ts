import {
  Component,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID
} from "@angular/core";
import { Observable } from "rxjs";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

import { StateService, ScrollService } from "../../core";

@Component({
  selector: "nav-bar",
  styleUrls: ["./navbar.component.css"],
  templateUrl: "./narbar.component.html"
})
export class NavBarComponent implements OnInit {
  public isAuthenticated: Observable<Boolean>;

  constructor(
    @Inject(DOCUMENT) document,
    @Inject(PLATFORM_ID) protected platformId: Object,
    private stateService: StateService,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.stateService.resetMobileNavStatus();
  }

  //listens for the scroll event to add the sticky header
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.stateService.getMobileNavStatus()) {
        if (window.pageYOffset > 15) {
          let element = document.getElementById("header");
          element.classList.add("sticky");
        } else {
          let element = document.getElementById("header");
          element.classList.remove("sticky");
        }
      }
    }
  }

  //toggle between true/false for the menu being open
  public toggleMobileMenu(): void {
    this.stateService.toggleMobileNav();
  }

  //reset the mobile open/close status
  //verify on the browser before trying to manipulate the dom
  public menuClick(): void {
    this.stateService.toggleMobileNav();

    if (isPlatformBrowser(this.platformId)) {
      if (this.stateService.getMobileNavStatus()) {
        this.setMobileClasses();
      } else {
        this.removeMobileClasses();
      }
    }
  }

  //return whether the mobile menus is open or not
  public getMobileMenuStatus(): boolean {
    return this.stateService.getMobileNavStatus();
  }

  //set the required mobile menu css classes when the mobile menu is open
  private setMobileClasses(): void {
    //set the hamburger style (changes to X)
    let elHamburger = document.getElementById("hamburger");
    elHamburger.classList.add("is-active");

    //set the parent HTML classes
    let elHTML = document.getElementById("htmlTag");
    elHTML.classList.add("mm-opened");
    elHTML.classList.add("mm-blocking");
    elHTML.classList.add("mm-background");
    elHTML.classList.add("mm-opening");

    //set the menu tab to open
    let elMmMenu = document.getElementById("mm-menu");
    elMmMenu.classList.add("mm-opened");
  }

  //remove the required mobile menu css classes when the mobile menu is closed
  private removeMobileClasses(): void {
    //set the hamburger style (changes to X)
    let elHamburger = document.getElementById("hamburger");
    elHamburger.classList.remove("is-active");

    //set the parent HTML classes
    let elHTML = document.getElementById("htmlTag");
    elHTML.classList.remove("mm-opened");
    elHTML.classList.remove("mm-blocking");
    elHTML.classList.remove("mm-background");
    elHTML.classList.remove("mm-opening");

    //set the menu tab to open
    let elMmMenu = document.getElementById("mm-menu");
    elMmMenu.classList.remove("mm-opened");
  }
}
