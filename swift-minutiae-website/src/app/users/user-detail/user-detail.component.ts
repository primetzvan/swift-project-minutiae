import {ActivatedRoute, Router} from '@angular/router';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {JsonServerService} from "../../json-server.service";
import {Role, User} from "../../models/user";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public id;
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: Role;

  constructor(private route: ActivatedRoute, private userService: JsonServerService,  private router: Router) {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.role = Role.USER;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  public checkEmail(): boolean{
    return !!(this.email !== '' && this.email.search('@'));
  }


  addUser(): void {
   var user = new User(null, this.firstName, this.lastName, this.email, this.role);

   this.userService.addUser(user)
     .subscribe(response => user.userID = response, () => console.log('error add user'),
       () =>
         (this.userService.addUserToSwift(user)
           .subscribe(response => console.log('added User to swift'), () => console.log('error add user to swift'),
             () => this.router.navigate(['/users'])))
     );


  }
}
