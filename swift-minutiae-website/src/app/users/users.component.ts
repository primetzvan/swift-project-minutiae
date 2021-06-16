import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  USER_DATA: User[];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'role', 'remove'];

  constructor() {
    this.USER_DATA = [];
    this.USER_DATA.push(new User(1, 'susi', 'simpel', 'susi@simpel.com', 1));
  }

  ngOnInit(): void {
  }

}
