import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { AuthenticationService } from '../../shared/services/AuthenticationService';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(
      public router: Router,
      private authService: AuthenticationService
    ) {}

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

    logIn() {
       this.authService.logIn("rherl23@gmail.com","123456")
       .subscribe(user => {
           console.log(user);
           this.router.navigate(['/']);
       });
    }
}
