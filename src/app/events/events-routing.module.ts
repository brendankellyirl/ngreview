import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { EventsComponent } from "./events.component";
import { EventComponent } from "./event/event.component";
import { EventResolver } from "./resolver/event.resolver";

const routes: Routes = [
  { path: "", component: EventsComponent },
  {
    path: ":slug",
    component: EventComponent,
    resolve: { event: EventResolver }
  }
];

export const Routing: ModuleWithProviders = RouterModule.forChild(routes);
