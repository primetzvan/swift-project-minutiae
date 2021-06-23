import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Door} from './models/door';
import {User} from './models/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtServerService {

  qrCode: string;

  constructor(private readonly http: HttpClient) {
  }

  //  { "userid": 1 , "doorid": 13, "from": 1618471665, "to": 1618471999 }
    getToken(userId: number, doorId: number, start: string, end: string): Observable<string> {

    const headers: HttpHeaders = new HttpHeaders({Accept: 'text/html'});

    window.open('http://localhost:3000/getQrCode?userID=' + userId + '&doorID=' + doorId + '&startDate=' + start + '&endDate=' + end, "_blank");

    return this.http
      .get('http://localhost:3000/getQrCode?userID=' + userId + '&doorID=' + doorId + '&startDate=' + start + '&endDate=' + end,
        {headers, responseType: 'text' }).pipe(
        tap(res => console.log(res))
      );
  }
}
