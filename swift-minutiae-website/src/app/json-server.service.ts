import { Injectable } from '@angular/core';
import {User} from './models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Door} from './models/door';

@Injectable({
  providedIn: 'root'
})
export class JsonServerService {

  constructor(private readonly http: HttpClient) {
  }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/getAllUsers');
  }

  getAllDoors(): Observable<Door[]> {
    return this.http.get<Door[]>('http://localhost:8000/getAllDoors');
  }

  addUser(user: User): void {
    this.http.post<User>('http://localhost:8000/addUser', user);
  }

  deleteUser(id: number): void {
    this.http.post<User>('http://localhost:8000/deleteUser', id);
  }
}
