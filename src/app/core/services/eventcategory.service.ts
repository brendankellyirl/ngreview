import { Injectable } from "@angular/core";

import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, map, shareReplay } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { ICategory } from "../models";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

const CACHE_SIZE = 1;

@Injectable({ providedIn: "root" })
export class EventCategoryService {
  //private baseUrl = "https://api.whatsonletterkenny.com/api"; // URL to web api
  private baseUrl = environment.api_url;
  private apiEndpoint = "/v1/eventcategories";

  //create a private cache obseravable
  private cache$: Observable<Array<ICategory>>;

  constructor(private http: HttpClient) {}

  /** GET all Events from the server */
  // getEventCategoriesOld(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/v1/eventcategories`).pipe(
  //     //tap(events => console.log("returned: " + JSON.stringify(events))),
  //     retry(3),
  //     catchError(this.handleError("getEventCategories", []))
  //   );
  // }

  /**
   * Function getEventCategories to return event categories from the CACHE observable or populate CACHE from service
   * @returns CACHE observable instance
   */
  get getEventCategories() {
    if (!this.cache$) {
      this.cache$ = this.requestEventCategories().pipe(shareReplay(CACHE_SIZE));
    }

    return this.cache$;
  }

  /**
   * Function requestEventCategories to call the event category service, retry 3 times before throwing error
   * @returns ICategory array
   */
  private requestEventCategories() {
    return this.http.get<ICategory[]>(this.baseUrl + this.apiEndpoint).pipe(
      retry(3),
      map(response => response),
      catchError(this.handleError("requestEventCategories", []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(error);
    };
  }
}
