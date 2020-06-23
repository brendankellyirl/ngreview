import { Injectable, PLATFORM_ID, Inject } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

/** Name of the local storage variable  */
const GRID_STORAGE_KEY = "gridL";
const currentDefault: boolean = true;

@Injectable()
export class GridLayoutService {
  constructor(@Inject(PLATFORM_ID) protected platformId: Object) {}

  /** Set the default value and initialize from the local storage variable if present  */
  private isGridView: boolean = currentDefault;
  private gridLayoutTracker = new BehaviorSubject<boolean>(this.init());

  /** If in the browser, read the local storage value otherwise set to true */
  init(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.isGridView =
        localStorage.getItem(GRID_STORAGE_KEY) == "false" ? false : true;
    } else {
      this.isGridView = currentDefault;
    }
    return this.isGridView;
  }

  /** Allows subscription to the behavior subject as an observable */
  getLayout(): Observable<boolean> {
    return this.gridLayoutTracker.asObservable();
  }

  /**
   * Allows updating the current value of the behavior subject
   * @param val a boolean representing the new value
   */
  setLayout(userPreference: boolean): void {
    this.gridLayoutTracker.next(userPreference);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(GRID_STORAGE_KEY, "" + userPreference);
    }
  }

  /** Resets the boolean to the initial value */
  resetLayout(): void {
    this.gridLayoutTracker.next(currentDefault);
  }
}
