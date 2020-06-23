import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authReq = req.clone({
      setHeaders: { "x-api-key": environment.authKey },
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
