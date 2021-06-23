import {Injectable} from '@angular/core';
import {Role, User} from './models/user';
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
    return this.http.get<User[]>('http://localhost:3000/getAllUsers');
  }

  getAllDoors(): Observable<Door[]> {
    return this.http.get<Door[]>('http://localhost:3000/getAllDoors');
  }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:3000/addUser', user={userID: 1, firstname: "Sibille", lastname: "sina", email: "asf", role: Role.USER});
  }

  deleteUser(id: number): void {
    this.http.delete<User>('http://localhost:3000/deleteUser/' + id);
  }
}
