import {Injectable} from '@angular/core';
import {Role, User} from './models/user';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Door} from './models/door';
import {tap} from "rxjs/operators";

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
    var uID: number;
    var role: string;

    if (user.role === Role.ADMIN){
      role = "admin";
    }else {
      role = "user";
    }

    return this.http.post<any>('http://localhost:3000/addUser',
      {
        "user": {
          "firstname": user.firstname,
          "lastname": user.lastname,
          "email": user.email,
          "role": role
        }
      })
      .pipe(
        tap((newUser: number) => console.log("USERID: " + newUser))
      );
  }

  addUserToSwift(user: User) {
    return this.http.post<User>('http://localhost:8000/addUser',
      {
        "user": {
          "userID": user.userID,
          "firstname": user.firstname,
          "lastname": user.lastname,
          "email": user.email,
          "role": user.role
        }
      });
  }

  deleteUser(id: number) {
    console.log("Hallo?" + id);
    this.http.delete<User>('http://localhost:8000/deleteUser?userID=' + id);
    return this.http.delete<User>('http://localhost:3000/deleteUser?userID=' + id).pipe(
      tap(_ => console.log(`deleted`))
    );
  }
}
