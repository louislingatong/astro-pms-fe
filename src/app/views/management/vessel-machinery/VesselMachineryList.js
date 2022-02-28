import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {usePrevious} from '../../../utils/Hooks';
import {Col, Row} from 'react-bootstrap';
import {Box, Button, Content} from 'adminlte-2-react';
import DataTable from '../../../components/DataTable';
import {
  vesselMachineryList,
  vesselMachineryData,
  metaData,
  reqListStatus,
  vesselMachineryListAsync
} from '../../../store/vesselMachinerySlice';
import {activeVesselSubMenu} from '../../../store/navbarMenuSlice';
import VesselMachinery from '../../../core/models/VesselMachinery';
import Divider from '../../../components/Divider';
import VesselMachineryDetail from '../vessel-machinery/VesselMachineryDetail';
import Modal from '../../../components/Modal';
import VesselDepartmentSelect from "../../../components/select/VesselDepartmentSelect";

function VesselMachineryList({name}) {
  const dispatch = useDispatch();

  const activeVessel = useSelector(activeVesselSubMenu);
  const vesselMachineries = useSelector(vesselMachineryList);
  const vesselMachinery = useSelector(vesselMachineryData);
  const meta = useSelector(metaData);
  const status = useSelector(reqListStatus);

  const [localActiveVessel, setLocalActiveVessel] = useState(vesselMachineries);
  const [localVesselMachineries, setLocalVesselMachineries] = useState(vesselMachineries);
  const [localVesselMachinery, setLocalVesselMachinery] = useState(vesselMachinery);
  const [params, setParams] = useState({});
  const [vesselMachineryModalShow, setVesselMachineryModalShow] = useState(false);
  const [selectedVesselMachineryIds, setSelectedVesselMachineryIds] = useState([]);

  const prevLocalVesselMachinery = usePrevious(localVesselMachinery);
  const prevParams = usePrevious(params);

  const isLoading = status === 'loading';

  useEffect(() => {
    if (activeVessel && activeVessel.id) {
      setLocalActiveVessel(activeVessel);
    }
  }, [activeVessel]);

  useEffect(() => {
    if (activeVessel && activeVessel.id && localVesselMachineries && !localVesselMachineries.length) {
      setParams({vessel: activeVessel.name});
    }
  }, [activeVessel, localVesselMachineries]);

  useEffect(() => {
    if (activeVessel && activeVessel.id && localVesselMachineries) {
      setLocalVesselMachineries(vesselMachineries);
    }
  }, [activeVessel, localVesselMachineries, vesselMachineries]);

  useEffect(() => {
    if (activeVessel && activeVessel.id && prevLocalVesselMachinery) {
      setLocalVesselMachinery(vesselMachinery);
      setParams({vessel: activeVessel.name});
    }
  }, [activeVessel, vesselMachinery]);

  useEffect(() => {
    if (prevLocalVesselMachinery
      && prevLocalVesselMachinery.id !== localVesselMachinery.id
      && !!localVesselMachinery.id) {
      handleModalOpen();
    }
  }, [localVesselMachinery]);

  useEffect(() => {
    if (prevParams) {
      initList();
    }
  }, [params]);

  const initList = () => {
    dispatch(vesselMachineryListAsync(params));
  };

  const handleRowSelect = (row) => {
    if (Array.isArray(row)) {
      setSelectedVesselMachineryIds(row);
    } else {
      setLocalVesselMachinery(row)
    }
  };

  const handlePageChange = (page) => {
    setParams({...params, page});
  };

  const handlePageLengthChange = (limit) => {
    setParams({...params, page: 1, limit});
  };

  const handleSearchChange = (keyword) => {
    const {vessel, department} = params;
    if (keyword) {
      !!department
        ? setParams({vessel, department, keyword})
        : setParams({keyword});
    } else {
      !!department
        ? setParams({vessel, department})
        : setParams({});
    }
  };

  const handleSelectDepartmentChange = (e) => {
    const {vessel} = params;
    const department = e.target.value;
    !!department ? setParams({vessel, department}) : setParams({vessel});
  };

  const handleModalOpen = () => {
    setVesselMachineryModalShow(true);
  };

  const handleModalClose = () => {
    setLocalVesselMachinery(new VesselMachinery());
    setVesselMachineryModalShow(false);
  };

  const header = [
    {
      title: 'Department',
      data: 'department',
      render: (department, row) => row.machinery.department.name,
    },
    {
      title: 'Machinery',
      data: 'machinery',
      render: machinery => machinery.name,
    },
    {
      title: 'Model',
      data: 'model',
      render: (model, row) => row.machinery.model.name,
    },
    {
      title: 'Maker',
      data: 'maker',
      render: (maker, row) => row.machinery.maker.name,
    },
    {
      title: 'In-charge',
      data: 'inchargeRank',
      render: (inchargeRank, row) => row.incharge_rank.name,
    },
  ];

  return (
    <React.Fragment>
      <Content title={name} browserTitle={name}>
        <Row>
          <Col xs={12}>
            <Button
              type="primary"
              text="Add New Vessel Machinery"
              onClick={handleModalOpen}
              pullRight
            />
          </Col>
          <Divider/>
          <Col xs={12}>
            <Box>
              <Row>
                <Col xs={12} md={4} lg={2}>
                  <VesselDepartmentSelect
                    name="vesselDepartment"
                    id="vesselDepartment"
                    placeholder="Department"
                    allowClear={true}
                    onChange={handleSelectDepartmentChange}
                  />
                </Col>
                <Col xs={12}>
                  <Divider type="line"/>
                </Col>
                <Col xs={12}>
                  <DataTable
                    api
                    data={localVesselMachineries}
                    columns={header}
                    options={{
                      page: true,
                      pageInfo: true,
                      pageLength: true,
                      search: true,
                    }}
                    hover
                    striped
                    fixed
                    responsive
                    border
                    meta={meta}
                    multiple
                    rowSelect
                    onSelect={handleRowSelect}
                    onPageChange={handlePageChange}
                    onSearchChange={handleSearchChange}
                    onPageLengthChange={handlePageLengthChange}
                    isLoading={isLoading}
                  />
                </Col>
                <Divider/>
                <Col xs={12}>
                  {
                    !!selectedVesselMachineryIds.length
                    && <Button type="danger" text={`Delete (${selectedVesselMachineryIds.length})`} pullRight/>
                  }
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
        <Modal
          show={vesselMachineryModalShow}
          title={localVesselMachinery.id ? 'Vessel Machinery Details' : 'Add New Vessel Machinery'}
          modalSize="lg"
          closeButton
          onHide={handleModalClose}
        >
          <VesselMachineryDetail data={localVesselMachinery} activeVessel={localActiveVessel}/>
        </Modal>
      </Content>
    </React.Fragment>
  )
}

export default VesselMachineryList;
