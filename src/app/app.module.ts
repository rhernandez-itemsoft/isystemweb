import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import {BasicAuthInterceptor } from './shared/interceptor/BasicAuthInterceptor';
import {ErrorInterceptor } from './shared/interceptor/ErrorInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


export function getToken() {
    return localStorage.getItem('token');
}
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
              tokenGetter: getToken,
              whitelistedDomains: [ 'http://localhost:8080'],
              blacklistedRoutes: [ '*' ]
            }
        }),

        LanguageTranslationModule,
        AppRoutingModule,

    ],

    declarations: [AppComponent],
    providers: [
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
