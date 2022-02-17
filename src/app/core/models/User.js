import UserStatus from './UserStatus';

export default function User(data = {}) {
  this.id = data.id ? data.id : 0;
  this.full_name = data.full_name ? data.full_name : null;
  this.first_name = data.first_name ? data.first_name : null;
  this.last_name = data.last_name ? data.last_name : null;
  this.status = data.status ? new UserStatus(data.status) : new UserStatus();
}
