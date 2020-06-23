import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { IFilterParams } from "../../models";

@Injectable()
export class SearchParamsService {
  constructor() {}

  /** Create the behavior subject*/
  private defaultFilterParams: IFilterParams = {
    title: "",
    dateRange: [],
    category: []
  };
  private searchParamsSource = new BehaviorSubject<IFilterParams>(this.init());

  /** Set the filters to blank */
  init(): IFilterParams {
    return this.defaultFilterParams;
  }

  /** Allows subscription to the behavior subject as an observable */
  getFilterParams(): Observable<IFilterParams> {
    return this.searchParamsSource.asObservable();
  }

  /**
   * Allows updating the current value of the behavior subject
   * @param val a boolean representing the new value
   */
  setFilterParams(userEntries: IFilterParams): void {
    this.searchParamsSource.next(userEntries);
  }

  /** Resets to the initial values */
  resetLayout(): void {
    this.searchParamsSource.next(this.defaultFilterParams);
  }
}
