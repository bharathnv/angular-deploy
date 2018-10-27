import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  Headers,
  RequestOptionsArgs,
  Request,
  RequestMethod
} from '@angular/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  //private apiUrl = 'http://localhost:8081';
  private apiUrl = 'https://assignment-backend-node.herokuapp.com/';

  constructor(private http: Http) { }

  private handleResponse(res: any) {
    const status = { 'code': res.status || {}, 'success': res.ok };
    const data = JSON.parse(res._body);
    if (!!status.success === false) {
      return Observable.throw('Error');
    }
    return data;
  }

  /// We are handling error here.
  /// throw it to calling method.
  private handleError(error: any) {
    if (error.status === 401) {
      localStorage.clear(); /// we clear local storage value
    }
    return Observable.throw(error);
  }

  /// Rest request method
  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    url = this.apiUrl + url;
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    if (!options.headers.has('Content-Type')) {
      options.headers.append('Access-Control-Allow-Origin', '*');
      options.headers.append('Content-Type', 'application/json');
    }
    return this.http.request(url, options);
  }

  /// Rest API GET Method
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.request(url, options);
  }

  /// Rest API POST Method
  post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    options = options || new RequestOptions();
    options.body = body;
    options.method = RequestMethod.Post;
    return this.request(url, options);
  }

  sendMessage(messageDetails: any): Observable<any> {
    const url = '/sendMessage';
    return this.post(url, messageDetails);
  }

  makeCall(callDetails: any): Observable<any> {
    const url = '/makeCall';
    return this.post(url, callDetails);
  }
}
