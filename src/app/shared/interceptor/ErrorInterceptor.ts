import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/AuthenticationService';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public router: Router,private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logOut();
                // location.reload(true);
                this.router.navigate(['/logout']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}
