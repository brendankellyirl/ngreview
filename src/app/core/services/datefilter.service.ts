import { Injectable } from "@angular/core";

@Injectable()
export class DateFilterService {
  public getDateFilters() {
    return DATEFILTERS;
  }
}

const DATEFILTERS = [
  {
    id: 1,
    displayName: "Today"
  },
  {
    id: 2,
    displayName: "Tomorrow"
  },
  {
    id: 3,
    displayName: "This Week"
  },
  {
    id: 4,
    displayName: "This Weekend"
  },
  {
    id: 5,
    displayName: "Next Weekend"
  },
  {
    id: 6,
    displayName: "This Month"
  }
];
