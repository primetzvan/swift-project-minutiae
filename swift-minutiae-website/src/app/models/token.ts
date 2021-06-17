import {User} from './user';
import {Door} from './door';

export interface Token {
  user: User;
  door: Door;
  startDate: Date;
  endDate: Date;
}
