import { Inject, Injectable } from "@angular/core";

@Injectable()
export class WebNavAPIService {
  webNavigator: any = null;
  public webNavSupported: boolean = false;

  constructor() {
    //retrieve the web navigator api reference
    this.webNavigator = window.navigator;

    //if the web nav is located, set the browser support to true
    if (this.webNavigator !== null && this.webNavigator.share !== undefined) {
      this.webNavSupported = true;
    } else {
      this.webNavSupported = false;
    }
  }

  /*--------------------------------------------------------------- */
  public getWebNavAPISupportStatus(): boolean {
    return this.webNavSupported;
  }
  /*--------------------------------------------------------------- */
}
