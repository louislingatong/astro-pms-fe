import React from 'react';
import {Link} from 'react-router-dom';
import user from '../../assets/images/user2-160x160.jpg';

function Profile() {
  return (
    <React.Fragment>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Profile</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img className="profile-user-img img-fluid img-circle" src={user}
                         alt="User Avatar" />
                    <h3 className="profile-username text-center">Administrator</h3>
                    <p className="text-muted text-center">Software Administrator</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link active" href="#account" data-toggle="tab">Account Info</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#personal" data-toggle="tab">Personal Info</a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane active" id="account">
                      <form className="form-horizontal">
                        <div className="form-group row">
                          <label htmlFor="inputUsername" className="col-sm-2 col-form-label">Username</label>
                          <div className="col-sm-10">
                            <input className="form-control" id="inputUsername" placeholder="Username" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                          <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                            <button type="submit" className="btn btn-danger">Submit</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane" id="personal">
                      <form className="form-horizontal">
                        <div className="form-group row">
                          <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">First Name</label>
                          <div className="col-sm-10">
                            <input className="form-control" id="inputFirstName" placeholder="First Name" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputName2" className="col-sm-2 col-form-label">Middle Name</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName2" placeholder="Name" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Last Name</label>
                          <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputLastName" placeholder="Last Name" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="offset-sm-2 col-sm-10">
                            <button type="submit" className="btn btn-danger">Submit</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Profile;