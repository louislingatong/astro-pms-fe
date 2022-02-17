import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Navbar, Inputs, Button} from 'adminlte-2-react';
import {logoutAsync} from '../../store/authSlice';
import CustomEntry from '../../components/CustomEntry';
import {
  reqStatus,
  vesselList,
  selectedVessel,
  vesselListAsync,
  setSelectedVessel
} from '../../store/navbarMenuSlice';

function NavbarMenu() {
  const {Entry} = Navbar;
  const {Text} = Inputs;

  const vessels = useSelector(vesselList);
  const activeVessel = useSelector(selectedVessel);
  const status = useSelector(reqStatus);

  const dispatch = useDispatch();
  const [vesselName, setVesselName] = useState();

  useEffect(() => {
    if (!vessels) {
      initVessels();
    }
  }, [vessels]);

  const handleSearchVesselChange = (e) => {
    setVesselName(e.target.value);
  };

  const handleSearchVessel = (e) => {
    e.stopPropagation();
    initVessels({keyword: vesselName});
  }

  const initVessels = (params = {}) => {
    dispatch(vesselListAsync(params));
  };

  return (
    <React.Fragment>
      <CustomEntry
        className="tasks-menu"
        icon="fa-ship"
        label={activeVessel.name}
        header={
          <Text
            name="search"
            id="searchVesselInput"
            labelPosition="none"
            placeholder="Search vessel"
            buttonRight={<Button flat icon="fa-search" onClick={handleSearchVessel} />}
            onChange={handleSearchVesselChange}
          />
        }
        footer={<Link to="/vessels">see all vessels</Link>}
      >
        {
          vessels && vessels.map(vessel => (
            <li key={vessel.id} className="task-item">
              <a href="#" onClick={() => dispatch(setSelectedVessel(vessel))}>{vessel.name}</a>
            </li>
          ))
        }
      </CustomEntry>
      <Entry
        icon="fa-power-off"
        onClick={() => logoutAsync()}
      />
    </React.Fragment>
  );
}

export default NavbarMenu;
