import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';


@Injectable({ providedIn: 'root' })
export class UserService {
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) { }

    getAll(currentPage: number, pigeSize: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/users/0/10`, { withCredentials: true } );
       
    }
}
