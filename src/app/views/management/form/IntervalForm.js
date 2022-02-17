import React from 'react';

function IntervalForm() {
  return (
    <React.Fragment>
      <div className="form-group row">
        <label htmlFor="inputInterval" className="col-sm-3 col-form-label">Interval</label>
        <div className="col-sm-9">
          <input className="form-control" id="inputInterval" />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputUnit" className="col-sm-3 col-form-label">Unit</label>
        <div className="col-sm-9">
          <select id="inputUnit" className="form-control select2">
            <option hidden>Select a Unit</option>
            <option>Hours</option>
            <option>Daily</option>
            <option>Weeks</option>
            <option>Months</option>
            <option>Years</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  )
}

export default IntervalForm;