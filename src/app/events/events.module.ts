import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { Routing } from "./events-routing.module";
import { EventsComponent } from "./events.component";
import { EventComponent } from "./event/event.component";
import { EventResolver } from "./resolver/event.resolver";

@NgModule({
  imports: [SharedModule, Routing],
  providers: [EventResolver],
  declarations: [EventsComponent, EventComponent]
})
export class EventsModule {}
