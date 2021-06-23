import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {JsonServerService} from '../json-server.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  USER_DATA: User[];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'role', 'remove'];

  constructor(private userService: JsonServerService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUser()
      .subscribe(users => this.USER_DATA = users);
  }

  deleteUser(id: number): void{
    console.log("del id" + id);
    this.userService.deleteUser(id);
  }
}
