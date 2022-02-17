export default function RunningHour(data = {}) {
  this.id = data.id ? data.id : 0;
  this.running_hours = data.running_hours ? data.running_hours : null;
  this.updating_date = data.updating_date ? data.updating_date : null;
  this.created_at = data.created_at ? data.created_at : null;
  this.creator = data.creator ? data.creator : null;
}
