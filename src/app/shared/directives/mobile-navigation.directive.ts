import { isPlatformServer } from "@angular/common";
import {
  Inject,
  PLATFORM_ID,
  Directive,
  Renderer2,
  ElementRef,
  OnInit
} from "@angular/core";

import { StateService } from "../../core";

@Directive({
  selector: "[appMobileNavigationClass]"
})
export class MobileNavigationDirective implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private stateService: StateService,
    @Inject(PLATFORM_ID) private platformId
  ) {}

  ngOnInit() {
    // if (isPlatformServer(this.platformId)) {
    //   console.log();
    // } else {
    //   console.log();
    // }
    if (this.stateService.getMobileNavStatus()) {
      console.log("true");
    } else {
      console.log("false");
    }
  }
}
