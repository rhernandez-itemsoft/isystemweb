import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
/*
import { AuthenticationService } from '../services/AuthenticationService';
private authenticationService: AuthenticationService
*/

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
   

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        // add authorization header with basic auth credentials if available
        if (token) {
            request = request.clone({
                withCredentials: false,
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                 //   'Allow-Origin-With-Credentials': 'true',
                 //   'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json' ,
                 //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATH, OPTIONS',
                 //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Authorization, X-Auth-Token, Content-Type, Accept',
                }
            });
        } else {
            request = request.clone({
                withCredentials: false,
                setHeaders: {
                    'Access-Control-Allow-Origin': 'http://localhost:8080',
                    // 'Allow-Origin-With-Credentials': 'true',
                    // 'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json' ,
                    // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                    // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Authorization, X-Auth-Token, Content-Type, Accept',
                }
            });
        }

        return next.handle(request);
    }
}
