import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../shared/services/AuthenticationService';
import { User } from 'src/app/models/user';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    public currentUser: User;
    constructor(private translate: TranslateService, public router: Router, private authService: AuthenticationService) {
        this.router.events.subscribe(val => {
            if ( val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });

        this.authService.currentUser.subscribe(response => {
            this.currentUser = response;
            console.log(response);
        });
    }
    currentUserFullName(): string {
       return this.currentUser.firstname + ' ' + this.currentUser.lastname + ' ' +  this.currentUser.mlastname;
    }
    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    logOut(){
        this.authService.logOut();
        this.router.navigate(['/login']);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
