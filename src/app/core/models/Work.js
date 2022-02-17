export default function Work(data = {}) {
  this.id = data.id ? data.id : 0;
  this.last_done = data.last_done ? data.last_done : null;
  this.instructions = data.instructions ? data.instructions : null;
  this.remarks = data.remarks ? data.remarks : null;
  this.created_at = data.created_at ? data.created_at : null;
  this.creator = data.creator ? data.creator : null;
}
