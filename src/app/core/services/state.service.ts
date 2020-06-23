import {
  Component,
  Inject,
  Injectable,
  PLATFORM_ID,
  Output,
  EventEmitter
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Observable } from "rxjs";

@Injectable()
export class StateService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {}

  /*--------------------------------------------------------------- */
  //status to confirm whether the mobile nav is open or not
  public isMobileNavOpen: boolean = false;

  public setMobileNavStatus(value: boolean): void {
    this.isMobileNavOpen = value;
  }

  public resetMobileNavStatus(): void {
    this.isMobileNavOpen = false;
  }

  public toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  public getMobileNavStatus(): boolean {
    return this.isMobileNavOpen;
  }
  /*--------------------------------------------------------------- */
}
