import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";

import { EventService } from "../../core";
import { map, catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable()
export class EventResolver implements Resolve<any> {
  constructor(private eventService: EventService, private router: Router) {} 

  resolve(route: ActivatedRouteSnapshot) {
    const eventSlug = route.params["slug"];
    //return this.eventService.getEvent(eventSlug).pipe(map(event => event));

    return this.eventService.getEvent(eventSlug).pipe(
      map(event => {
        if (event) {
          return event;
        } else {
          this.router.navigate(["/404"]);
          return false;
        }
      }),
      catchError(error => of(`Error in returning data: ${error}`))
    );
  }
}
