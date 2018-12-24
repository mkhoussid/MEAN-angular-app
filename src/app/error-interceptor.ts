import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // handle gives back response observable stream
    // we can hook into that stream and listen to events with pipe()
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        alert(error.error.message);
        // since i'm just adding something to observable stream (and handling it wherever we subscribe such as
        // auth.service and post.service), so i HAVE to return an observable (throwError). BUT, I can handle the
        // error(s) just above
        return throwError(error);
      })
    );
  }
}
