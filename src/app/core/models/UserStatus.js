export default function UserStatus(data = {}) {
  this.id = data.id ? data.id : 0;
  this.name = data.name ? data.name : null;
}
