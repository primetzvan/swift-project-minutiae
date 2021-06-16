import { Component, OnInit } from '@angular/core';
import {Door} from '../models/door';
import {User} from '../models/user';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-generate-token',
  templateUrl: './generate-token.component.html',
  styleUrls: ['./generate-token.component.css']
})
export class GenerateTokenComponent implements OnInit {

  users: User[];
  doors: Door[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() {
    this.users = [];
    this.users.push(new User(1, 'susi', 'simpel', 'susi@simpel.com', 1));
    this.users.push(new User(2, 'sibille', 'simpel', 'sibille@simpel.com', 0));
  }

  ngOnInit(): void {
  }

}
