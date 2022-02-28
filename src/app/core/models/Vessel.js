import VesselOwner from './VesselOwner';

export default function Vessel(data = {}) {
  this.id = data.id ? data.id : 0;
  this.name = data.name ? data.name : '';
  this.owner = data.owner ? new VesselOwner(data.owner) : new VesselOwner();
}
