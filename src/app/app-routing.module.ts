import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { StandardLayoutComponent } from "./shared";

const routes: Routes = [
  {
    path: "",
    component: StandardLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      }
    ]
  },
  {
    path: "events",
    component: StandardLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./events/events.module").then(m => m.EventsModule)
      }
    ]
  },
  { path: "", redirectTo: "/home", pathMatch: "full" }
  // {
  //   path: "404",
  //   component: StandardLayoutComponent,
  //   children: [
  //     {
  //       path: "",
  //       loadChildren: () =>
  //         import("./not-found/not-found.module").then(m => m.NotFoundModule)
  //     }
  //   ]
  // },
  // {
  //   path: "**",
  //   redirectTo: "/404"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
