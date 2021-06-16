export class User {

  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;

  constructor(id: number, firstname: string, lastname: string, email: string, role: Role) {
    this.id = id;
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
