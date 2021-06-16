import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Door} from './models/door';

@Injectable({
  providedIn: 'root'
})
export class JwtServerService {

  constructor() { }

  //  { "userid": 1 , "doorid": 13, "from": 1618471665, "to": 1618471999 }
  getToken(): void {

  }
}
