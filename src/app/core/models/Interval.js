import IntervalUnit from './IntervalUnit';

export default function Interval(data = {}) {
  this.id = data.id ? data.id : 0;
  this.value = data.value ? data.value : null;
  this.unit = data.unit ? new IntervalUnit(data.unit) : new IntervalUnit();
}
