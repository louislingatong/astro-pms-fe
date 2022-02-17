import React, {useState} from 'react';
import classnames from 'classnames';

function MachineryForm() {
  return (
    <React.Fragment>
      <div className="form-group row">
        <label htmlFor="inputDepartment" className="col-sm-3 col-form-label">Department</label>
        <div className="col-sm-9">
          <select id="inputDepartment" className="form-control select2">
            <option hidden>Select a Department</option>
            <option>Deck</option>
            <option>Engine</option>
            <option>Galley</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputMachinery" className="col-sm-3 col-form-label">Machinery</label>
        <div className="col-sm-9">
          <select id="inputMachinery" className="form-control select2">
            <option hidden>Select a Machinery</option>
            <option>Hatch Cover Emergency Equipment</option>
          </select>
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputMaker" className="col-sm-3 col-form-label">Maker</label>
        <div className="col-sm-9">
          <input className="form-control" id="inputMaker" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputModel" className="col-sm-3 col-form-label">Model</label>
        <div className="col-sm-9">
          <input className="form-control" id="inputModel" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputInCharge" className="col-sm-3 col-form-label">In-charge</label>
        <div className="col-sm-9">
          <select id="inputInCharge" className="form-control select2">
            <option hidden>Select a In-charge</option>
            <option>Master</option>
            <option>Chief Officer</option>
            <option>2nd Officer</option>
            <option>3rd Officer</option>
            <option>Chief Engineer</option>
            <option>1st Engineer</option>
            <option>2nd Engineer</option>
            <option>3rd Engineer</option>
            <option>4th Engineer</option>
            <option>Boatswain</option>
            <option>Able-Bodied Seaman</option>
            <option>Electrician</option>
            <option>Ordinary Seaman</option>
            <option>Deck Cadete</option>
            <option>Chief Cook</option>
            <option>Messman</option>
            <option>Oiler</option>
            <option>Wiper</option>
            <option>Engine Cadete</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MachineryForm;