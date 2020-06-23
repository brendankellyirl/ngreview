import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";

import { Observable, throwError, of } from "rxjs";
import {
  catchError,
  retry,
  map,
  tap,
  concatMap,
  mergeMap,
  concatAll
} from "rxjs/operators";
import { IQueryConfig } from "../models";

//import { Hero } from './hero';
//import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: "root" })
export class EventService {
  //private baseUrl = "http://localhost:3050/api"; // URL to web api
  //private baseUrl = "https://api.whatsonletterkenny.com/api"; // URL to web api
  ///private baseUrl = "/api"; // URL to web api
  private baseUrl = environment.api_url;

  constructor(private http: HttpClient) {}

  /** GET all Events from the server */
  getEvents(queryFilers: IQueryConfig): Observable<any> {
    //get the parameters to be passed to the service
    let filterParams = new HttpParams();
    filterParams = filterParams.append("offset", "" + queryFilers.offset);
    filterParams = filterParams.append("limit", "" + queryFilers.limit);
    filterParams = filterParams.append("sorter", "" + queryFilers.sort);

    //Make the service call once subcribed to
    return this.http
      .get<any>(`${this.baseUrl}/v1/event/filter`, { params: filterParams })
      .pipe(
        //tap(events => console.log("returned: " + JSON.stringify(events))),
        retry(3),
        catchError(this.handleError("getEvents", []))
      );
  }

  /** GET all Events from the server */
  getEventsPost(queryFilers: IQueryConfig): Observable<any> {
    return this.http
      .post<any>(
        `${this.baseUrl}/v1/event/eventFilter`,
        queryFilers,
        httpOptions
      )
      .pipe(
        //tap(events => console.log("returned: " + JSON.stringify(events))),
        retry(3),
        catchError(this.handleError("getEvents", []))
      );
  }

  getEvents2(queryFilers: IQueryConfig): Observable<any> {
    let cats = this.createCategoryString(queryFilers);

    return this.http
      .get<any>(
        `${this.baseUrl}/v1/event/filter?limit=${queryFilers.limit}&offset=${
          queryFilers.offset
        }&title=${queryFilers.title}&category=${cats}&daterange=${
          queryFilers.dateRange
        }`
      )
      .pipe(
        //tap(events => console.log("returned: " + JSON.stringify(events))),
        retry(3),
        catchError(this.handleError("getEvents", []))
      );
  }

  /** GET all Events from the server */
  getTrendingEvents(queryFilers: IQueryConfig): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/event/trending?limit=${queryFilers.limit}&offset=${
          queryFilers.offset
        }`
      )
      .pipe(
        //tap(events => console.log("returned: " + JSON.stringify(events))),
        retry(3),
        catchError(this.handleError("getEvents", []))
      );
  }

  /** GET all Events from the server */
  searchEvents(searchTerm: String): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/v1/event/search?searchTerm=${searchTerm}`)
      .pipe(
        //tap(events => console.log("returned: " + JSON.stringify(events))),
        retry(3),
        catchError(this.handleError("searchEvents", []))
      );
  }

  /** POST update like count on event to increase */
  likeEvent(eventID: String): Observable<any> {
    let likedEvent = { eventid: eventID };
    let jsonBodyObj = JSON.stringify(likedEvent);

    return this.http
      .post<any>(`${this.baseUrl}/v1/event/like`, jsonBodyObj, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError("likeEvent", [jsonBodyObj]))
      );
  }

  /** POST update like count on event to decrease */
  unLikeEvent(eventID: String): Observable<any> {
    let likedEvent = { eventid: eventID };
    let jsonBodyObj = JSON.stringify(likedEvent);

    return this.http
      .post<any>(`${this.baseUrl}/v1/event/unlike`, jsonBodyObj, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError("likeEvent", [jsonBodyObj]))
      );
  }

  /** GET Events by Event ID passed to i, along with related events by Location and Category */
  getEvent(id: String): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v1/event/${id}`).pipe(
      retry(2),
      catchError(this.handleError("getEvent", [Error]))
    );
  }

  /** GET Events by Event ID passed to i, along with related events by Location and Category */
  getEventRelated(id: String): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v1/event/${id}`).pipe(
      tap(event => {
        if (event == null) {
          return throwError(new Error("No events found..."));
        }
      }),
      concatMap(
        data =>
          <Observable<any>>(
            this.http
              .get<any>(
                `${this.baseUrl}/v1/event/related/${
                  data.event._id
                }?limit=3&locationid=${data.event.location._id}&categoryid=${
                  data.event.category[0]._id
                }`
              )
              .pipe(
                map(relatedData => ({
                  eventData: data.event,
                  relatedLocEventData: relatedData.locationEvents,
                  relatedCatEventData: relatedData.categoryEvents,
                  count: data.count
                })),
                catchError(this.handleError("getEvent", [Error]))
              )
          )
      ),
      retry(2),
      catchError(this.handleError("getEvent", [Error]))
    );
  }

  getEvent_v1(id: String): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/v1/event/${id}`).pipe(
      concatMap(
        event =>
          <Observable<any>>(
            this.http
              .get<any>(
                `${this.baseUrl}/v1/event/relatedbyloc/${
                  event.location._id
                }?limit=3&eventID=${event._id}`
              )
              .pipe(
                map(relatedData => ({
                  eventData: event,
                  relatedEventData: relatedData
                }))
              )
          )
      ),
      retry(3),
      catchError(this.handleError("getEvent", []))
    );
  }

  /** GET all Events by Category ID passed to it */
  getEventsByCategoryID(
    catID: String,
    queryFilers: IQueryConfig
  ): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseUrl}/v1/event/category/${catID}?limit=${
          queryFilers.limit
        }&offset=${queryFilers.offset}`
      )
      .pipe(
        retry(3),
        catchError(this.handleError("getEventsByCategoryID", []))
      );
  }

  /** GET 3 EVENTS based on the location passed, not including the event ID passed  */
  getEventsRelatedByLocation(
    locID: String,
    eventID: String
  ): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${
          this.baseUrl
        }/v1/event/relatedbyloc/${locID}?limit=3&eventID=${eventID}`
      )
      .pipe(
        retry(3),
        catchError(this.handleError("getEventsRelatedByLocation", []))
      );
  }

  /** GET 3 EVENTS based on the category passed, not including the event ID passed  */
  getEventsRelatedByCategory(
    catID: String,
    eventID: String
  ): Observable<any[]> {
    return this.http
      .get<any[]>(
        `${
          this.baseUrl
        }/v1/event/relatedbycat/${catID}?limit=3&eventID=${eventID}`
      )
      .pipe(
        retry(3),
        catchError(this.handleError("getEventsRelatedByCategory", []))
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

  //convert the category objects into list of ids
  private createCategoryString(params: IQueryConfig): String {
    let catsString = "";
    if (params.categorys) {
      catsString = Array.prototype.map
        .call(params.categorys, cat => cat.filterID)
        .toString();
    }

    return catsString;
  }
}
