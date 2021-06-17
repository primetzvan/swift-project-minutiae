export class User {

  userID: number;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;

  constructor(userID: number, firstname: string, lastname: string, email: string, role: Role) {
    this.userID = userID;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role = role;
  }
}

enum Role{
  ADMIN,
  USER
}
