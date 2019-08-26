import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


import { environment } from '../../../environments/environment';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, public jwtHelper: JwtHelperService ) {
        const token = localStorage.getItem('token');
        if (token !== undefined && token !== null) {
            const tokenDecode = this.jwtHelper.decodeToken(token);
            const user = tokenDecode.Data;

            this.currentUserSubject = new BehaviorSubject<User>(user);
            this.currentUser = this.currentUserSubject.asObservable();

        } else {
            this.currentUserSubject = new BehaviorSubject<User>(JSON.parse( null ));
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    logIn(username: string, password: string) {
        /*
        httpOptions.headers.append('Access-Control-Allow-Origin', 'http://localhost:8080');
        httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        httpOptions.headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
        */
        return this.http.post<any>(`${environment.apiUrl}/security/login`, { email: username, 'password' : password })
            .pipe(map(response => {
                const token = response.Data.Token;
                const tokenDecode = this.jwtHelper.decodeToken(token);
                const user = tokenDecode.Data;

                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token );
                this.currentUser = user;
                this.currentUserSubject.next(user);
                return user;
            }) );
    }

    logOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUser = null;
        this.currentUserSubject.next(null);
    }
}
