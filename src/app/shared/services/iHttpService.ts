import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError, Subscription, Subscribable } from 'rxjs';

import { environment } from './../../../environments/environment';

@Injectable()
export class IsHttpService {

  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, headers?: object): Observable<any> {
    // const options = new RequestOptions({ headers: this.setHeaders(headers) });

    return this.http.get(environment.getUrl(url));
    /*
      .pipe(
        map(response => {
          const json: any = this.extractData(response);
          return json;
        })
      )
      ;*/
      /*
     .map((res: any) => {

       // extrae el JSON
       const json: any = this.extractData(res);

       // si existe algun comando en la respuesta entonces lo ejecuta
       if (json.cmd) {
         this.execCmd(json.cmd);
       }

       // regresa la respuesta
       return json;
     })
     .catch((err) => {
       return this.handleError(err);
     });*/
  }
  /*
  public post(url: string, data: any, headers?: object): Observable<any> {
    return this.http.post(environment.getUrl(url), data)
      .map((res: Response) => {
        // extrae el JSON
        const json: any = this.extractData(res);

        // si existe algun comando en la respuesta entonces lo ejecuta
        if (json.cmd) {
          this.execCmd(json.cmd);
        }

        // regresa la respuesta
        return json;
      }
      )
      .catch((err) => {
        return this.handleError(err);
      });
  }
  public put(url: string, data: any, headers?: object): Observable<any> {

    return this.http.put(environment.getUrl(url), data)
      .map((res: Response) => {
        // extrae el JSON
        const json: any = this.extractData(res);

        // si existe algun comando en la respuesta entonces lo ejecuta
        if (json.cmd) {
          this.execCmd(json.cmd);
        }

        // regresa la respuesta
        return json;
      }
      )
      .catch((err) => {
        return this.handleError(err);
      });
  }
  public delete(url: string, headers?: object): Observable<any> {

    return this.http.delete(environment.getUrl(url))
      .map((res: Response) => {
        // extrae el JSON
        const json: any = this.extractData(res);

        // si existe algun comando en la respuesta entonces lo ejecuta
        if (json.cmd) {
          this.execCmd(json.cmd);
        }

        // regresa la respuesta
        return json;
      })
      .catch((err) => {
        return this.handleError(err);
      });
  }
*/

  private extractData(res: any) {
    const jsonResponse = res.json() || {};

    const response = this.processResponseData(res.status, res.statusText, jsonResponse);
    return response;
  }
  private handleError(error: any): Observable<any> {

    // recibe la respuesta del servidor y trata de obtener el JSON (en caso de que se haya mandado)

    let jsonResponse = {};
    try {
      jsonResponse = error._body ? JSON.parse(error._body) : {};
    } catch (err) {

    }

    const response = this.processResponseData(error.status, error.statusText, jsonResponse);

    // Ejecuta un comando en caso de que el servidor así lo haya solicitado
    if (response.cmd) {
      this.execCmd(response.cmd);
    }
    return throwError(response);
    // return Observable.throw(response);
  }


  private processResponseData(status: number, statusText: string, jsonResponse: any): any {
    const response: any = { code: 0, message: '', data: {} };
    response.code = status;
    if (typeof jsonResponse === 'object') {
      // Deshabilitamos los comandos
      // response.cmd = jsonResponse.cmd?jsonResponse.cmd:null;
      /*
      if (jsonResponse.message){
        response.message = jsonResponse.message;
      }else{
        response.message = 'Unknow Error!';
      }*/
      if (jsonResponse.message) {
        response.message = jsonResponse.cmd ? '' : jsonResponse.message;
      } else if (jsonResponse.warning) {
        response.message = jsonResponse.cmd ? '' : jsonResponse.warning;
      } else if (jsonResponse.error) {
        response.message = jsonResponse.cmd ? '' : jsonResponse.error;
      } else {
        response.message = 'Unknow Error!';
      }
      // response.message = response.cmd?'': jsonResponse.message?jsonResponse.message:'Unknow Error!';
      response.data = jsonResponse.data ? jsonResponse.data : {};
    } else {
      response.message = statusText;
    }

    return response;
  }
  public execCmd(cmd: string): void {

    switch (cmd) {
      case 'SignOut': {
        // Des-autentifica al usuario
        console.log('SignOut');

        break;
      }
      case 'RenewToken': {
        // Renueva el Token
        console.log('RenewToken');

        break;
      }
      case 'RenewApiKey': {
        // Renueva el Api Key
        console.log('RenewApiKey');

        break;
      }
    }
    // alert('execCmd....');
  }

}
