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
          <input className="form-control" id="inputMachinery" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputMachineryCode" className="col-sm-3 col-form-label">Machinery Code</label>
        <div className="col-sm-9">
          <input className="form-control" id="inputMachineryCode" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default MachineryForm;