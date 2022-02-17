import React from 'react';

function VesselForm() {
  return (
    <React.Fragment>
      <div className="form-group row">
        <label htmlFor="inputDepartment" className="col-sm-3 col-form-label">Owner</label>
        <div className="col-sm-9">
          <select id="inputDepartment" className="form-control select2">
            <option hidden>Select a Owner</option>
            <option>Glocal Japan</option>
            <option>Glocal Maritime Ltd.</option>
            <option>LEALTY MARINE CORP.</option>
            <option>Safardo Shipping Pte. Ltd</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputVessel" className="col-sm-3 col-form-label">Vessel</label>
        <div className="col-sm-9">
          <input className="form-control" id="inputVessel" />
        </div>
      </div>
    </React.Fragment>
  )
}

export default VesselForm;